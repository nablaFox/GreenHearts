import {
  addUser as addUserInFirestore,
  deleteUser as deleteUserInFirestore
} from '@/api/users'
import { create } from 'zustand'
import { getAuthUserId } from '@/libs/nativeAuth'

import type { FirestoreError } from '@/api'
import type { ActionResult, ActionStatus } from '@/types'

type AddUserParams = {
  username: string
  isOwl: boolean
}

interface UsersStoreState {
  addUserStatus: ActionStatus<FirestoreError | 'unhautenticated'>

  addUser: (params: AddUserParams) => Promise<void>
  deleteUser: (userId: string) => Promise<ActionResult<FirestoreError>>
}

export const useUsers = create<UsersStoreState>((set, get) => ({
  addUserStatus: 'idle',

  addUser: async (params: AddUserParams) => {
    const authUserId = getAuthUserId()

    if (!authUserId) return set({ addUserStatus: 'unhautenticated' })

    set({ addUserStatus: 'loading' })

    const res = await addUserInFirestore(params, authUserId)

    if (res !== 'ok') set({ addUserStatus: res })

    set({ addUserStatus: 'success' })
  },

  deleteUser: async (userId: string) => deleteUserInFirestore(userId)
}))
