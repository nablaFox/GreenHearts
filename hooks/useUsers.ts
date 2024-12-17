import { firestore } from '@/api'
import { create } from 'zustand'
import { authUserId } from '@/libs/nativeAuth'

import type { FirestoreError } from '@/api'
import type { ActionStatus } from '@/types'

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
  addUserStatus: 'success',

  addUser: async (params: AddUserParams) => {
    if (!authUserId) return

    set({ addUserStatus: 'loading' })

    const res = await firestore
      .user({ userId: authUserId })
      .set({
        username: params.username,
        isOwl: params.isOwl,
        bunnies: []
      })
      .catch(e => e?.code as FirestoreError)

    res !== undefined && set({ addUserStatus: res })

    set({ addUserStatus: 'success' })
  },

  deleteUser: async (userId: string) => {
    return 'success'
  }
}))
