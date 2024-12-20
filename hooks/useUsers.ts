import { firestore } from '@/api'
import { create } from 'zustand'
import { getAuthUserId } from '@/libs/nativeAuth'

import type { FirestoreError } from '@/api'
import type { ActionStatus, UserInDatabase } from '@/types'

type AddUserParams = {
  username: string
  isOwl: boolean
}

interface UsersStoreState {
  addUserStatus: ActionStatus<FirestoreError>

  addUser: (params: AddUserParams) => Promise<void>
  deleteUser: (userId: string) => Promise<ActionStatus<FirestoreError>>
}

export const useUsers = create<UsersStoreState>((set, get) => ({
  addUserStatus: 'idle',

  addUser: async (params: AddUserParams) => {
    const authUserId = getAuthUserId()

    if (!authUserId) return

    set({ addUserStatus: 'loading' })

    const toAdd: UserInDatabase = {
      username: params.username,
      isOwl: params.isOwl
    }

    if (params.isOwl) {
      toAdd.bunnies = []
    }

    try {
      await firestore.user({ userId: authUserId }).set(toAdd)
      set({ addUserStatus: 'success' })
    } catch (e: any) {
      const code = e?.code as FirestoreError
      set({ addUserStatus: code })
    }
  },

  deleteUser: async (userId: string) => {
    return 'success'
  }
}))
