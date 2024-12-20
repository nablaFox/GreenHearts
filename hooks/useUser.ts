import { type FirestoreError } from '@/api'
import type { ActionStatus, User } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthUserId } from '@/libs/nativeAuth'

import { create } from 'zustand'
import { getUser, setUserCallback } from '@/api/user'

type FetchUserStatus = ActionStatus<'unauthenticated-user' | FirestoreError>

interface UserStoreState {
  bunnyId: string | null
  fetchUserStatus: FetchUserStatus
  user: User | null
  firebaseSubscriber: (() => void) | null
  setBunnyId: (bunnyId: string) => void
  setFirebaseCallback: (userId: string) => void
  fetchUser: () => Promise<void>
  reset: () => void
  isOwl: () => boolean
  areThereBunnies: () => boolean
  isBunnySet: () => boolean
  isLogged: () => boolean
}

export const useUser = create<UserStoreState>((set, get) => ({
  bunnyId: null,
  user: null,
  fetchUserStatus: 'idle',
  firebaseSubscriber: null,

  setFirebaseCallback: (userId: string) => {
    const previousCallback = get().firebaseSubscriber
    if (previousCallback) previousCallback()

    const unsubscribe = setUserCallback({
      userId,
      callback: user => set({ user: { ...user, key: userId } }),
      onError: code => set({ fetchUserStatus: code })
    })

    set({ firebaseSubscriber: unsubscribe })
  },

  fetchUser: async () => {
    const authUserId = getAuthUserId()

    if (!authUserId) {
      return set({ fetchUserStatus: 'unauthenticated-user' })
    }

    set({ fetchUserStatus: 'loading' })

    const [error, userData] = await getUser(authUserId)

    if (error) return set({ fetchUserStatus: error })

    get().setFirebaseCallback(authUserId)

    set({ user: { ...userData, key: authUserId } })

    if (!userData!.isOwl) {
      set({ fetchUserStatus: 'success' })
      return get().setBunnyId(authUserId)
    }

    const bunnyId = await AsyncStorage.getItem('bunnyId').catch(() => null)
    if (bunnyId) get().setBunnyId(bunnyId)

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

  areThereBunnies: () => (get().user?.bunnies?.length ?? 0) > 0,

  isLogged: () => !!get().user && get().fetchUserStatus === 'success',

  isBunnySet: () => !!get().bunnyId
}))
