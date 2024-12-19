import { type FirestoreError, firestore } from '@/api'
import type { ActionStatus, User } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuthUserId } from '@/libs/nativeAuth'

import { create } from 'zustand'

// QUESTION: if the user is unhathenticated maybe firebase will throw this error for us
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

    if (previousCallback) {
      previousCallback()
    }

    const unsubscribe = firestore.user({ userId }).onSnapshot(
      doc => {
        const user = doc?.data()

        if (!user) return

        set({ user: { ...user, key: doc.id } })
      },
      (e: any) => {
        const code = e?.code as FirestoreError
        set({ fetchUserStatus: code })
      }
    )

    set({ firebaseSubscriber: unsubscribe })
  },

  fetchUser: async () => {
    const authUserId = getAuthUserId()

    if (!authUserId) {
      return set({ fetchUserStatus: 'unauthenticated-user' })
    }

    try {
      set({ fetchUserStatus: 'loading' })

      const userDoc = await firestore.user({ userId: authUserId }).get()

      if (!userDoc.exists) {
        return set({ fetchUserStatus: 'firestore/not-found' })
      }

      const userData = userDoc.data()!

      set({
        user: { ...userData, key: userDoc.id },
        fetchUserStatus: 'success'
      })

      get().setFirebaseCallback(authUserId)

      if (!userData.isOwl) {
        return get().setBunnyId(authUserId)
      }

      const bunnyId = await AsyncStorage.getItem('bunnyId').catch(() => null)
      if (bunnyId) get().setBunnyId(bunnyId)
    } catch (e: any) {
      console.log(e)
      const code = e?.code as FirestoreError
      set({ fetchUserStatus: code })
    }
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

  isLogged: () => !!get().user,

  isBunnySet: () => !!get().bunnyId
}))
