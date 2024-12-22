import { type FirestoreError } from '@/api'
import type { ActionStatus, User } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthUserId } from '@/libs/nativeAuth'

import { create } from 'zustand'
import { getUser, setUserCallback } from '@/api/user'

export type FetchUserStatus = ActionStatus<FirestoreError>

interface UserStoreState {
  bunnyId: string | null
  fetchUserStatus: FetchUserStatus
  user: User | null
  bunny: User | null
  firebaseSubscriber: (() => void) | null
  setBunnyId: (bunnyId: string) => void
  fetchBunny: (userId: string) => void
  fetchAuthUser: () => Promise<void>
  reset: () => void
  isOwl: () => boolean
  areThereBunnies: () => boolean
  isBunnySet: () => boolean
}

export const useUser = create<UserStoreState>((set, get) => ({
  bunnyId: null,
  user: null,
  bunny: null,
  fetchUserStatus: 'idle',
  firebaseSubscriber: null,

  fetchBunny: (bunnyId: string) => {
    const previousCallback = get().firebaseSubscriber
    if (previousCallback) previousCallback()

    const unsubscribe = setUserCallback({
      userId: bunnyId,
      callback: user => set({ bunny: { ...user, key: bunnyId } }),
      onError: code => set({ fetchUserStatus: code })
    })

    set({ firebaseSubscriber: unsubscribe })
  },

  fetchAuthUser: async () => {
    const authUserId = getAuthUserId()

    if (!authUserId) {
      return set({ fetchUserStatus: 'firestore/permission-denied' })
    }

    set({ fetchUserStatus: 'loading' })

    const [error, userData] = await getUser(authUserId)

    if (error) return set({ fetchUserStatus: error })

    set({ user: { ...userData, key: authUserId } })

    if (!userData!.isOwl) {
      set({
        fetchUserStatus: 'success',
        bunny: { ...userData, key: authUserId }
      })
      return get().setBunnyId(authUserId)
    }

    const bunnyId = await AsyncStorage.getItem('bunnyId').catch(() => null)
    if (bunnyId) get().setBunnyId(bunnyId)

    // callback for owl user
    setUserCallback({
      userId: authUserId,
      callback: user => set({ user: { ...user, key: authUserId } }),
      onError: code => set({ fetchUserStatus: code })
    })

    set({ fetchUserStatus: 'success' })
  },

  setBunnyId: (bunnyId: string) => {
    if (get().isOwl()) {
      AsyncStorage.setItem('bunnyId', bunnyId).catch(() => null)
    }

    set({ bunnyId })
  },

  reset: () => {
    get().firebaseSubscriber?.()

    set({
      bunnyId: null,
      user: null,
      fetchUserStatus: 'idle',
      firebaseSubscriber: null
    })
  },

  isOwl: () => get().user?.isOwl ?? false,

  areThereBunnies: () =>
    !get().isOwl() || (get().user?.bunnies?.length ?? 0) > 0,

  isBunnySet: () => !get().isOwl() || !!get().bunnyId
}))
