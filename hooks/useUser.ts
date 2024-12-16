import { FirebaseErrors, firestore } from '@/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

import { create } from 'zustand'

import { usePosts } from './usePosts'

interface UserStoreState {
  bunnyId: string | null
  fetchUserStatus: FetchUserStatus
  user: User | null
  firebaseSubscriber: (() => void) | null
  setBunnyId: (bunnyId: string) => void
  setFirebaseCallback: (userId: string) => void
  fetchUser: () => Promise<void>
  addUser: (data: { username: string; isOwl: boolean }) => void
  reset: () => void
}

export const useUser = create<UserStoreState>((set, get) => ({
  bunnyId: null,
  user: null,
  fetchUserStatus: 'success',
  firebaseSubscriber: null,

  setFirebaseCallback: (userId: string) => {
    const previousCallback = get().firebaseSubscriber

    // fetch posts

    if (previousCallback) {
      previousCallback()
    }

    const subscriber = firestore.user({ userId }).onSnapshot(
      doc => {
        const user = doc.data()

        set({ user: { ...user, key: doc.id } })
        set({ fetchUserStatus: 'success' })
      },
      error => {
        set({ fetchUserStatus: error.message as FirebaseErrors.FirestoreError })
      }
    )

    set({ firebaseSubscriber: subscriber })
  },

  fetchUser: async () => {
    set({ fetchUserStatus: 'loading' })

    const authUser = auth().currentUser

    if (!authUser) {
      return set({ fetchUserStatus: 'first-time-user' })
    }

    const userDoc = await firestore.user({ userId: authUser.uid }).get()

    if (!userDoc.exists) {
      return set({ fetchUserStatus: 'not-found' })
    }

    const userData = userDoc.data()

    if (!userData) {
      return set({ fetchUserStatus: 'not-found' })
    }

    if (!userData.isOwl) {
      return get().setBunnyId(authUser.uid)
    }

    const bunnyId = await AsyncStorage.getItem('bunnyId').catch(() => null)

    if (!bunnyId || !userData.bunnies?.includes(bunnyId)) {
      return set({ fetchUserStatus: 'no-bunny' })
    }

    if (!userData.bunnies.length) {
      return set({ fetchUserStatus: 'no-bunnies' })
    }

    get().setBunnyId(bunnyId)
  },

  setBunnyId: (bunnyId: string) => {
    set({ bunnyId })
    get().setFirebaseCallback(bunnyId)
  },

  addUser: async params => {
    const userId = auth().currentUser?.uid

    if (!userId) return

    await firestore.user({ userId }).set({
      username: params.username,
      isOwl: params.isOwl,
      bunnies: []
    })

    get().fetchUser()
  },

  reset: () => {
    get().firebaseSubscriber?.()

    set({
      bunnyId: null,
      user: null,
      fetchUserStatus: 'success',
      firebaseSubscriber: null
    })
  }
}))

export const useIsOwl = () => useUser(state => state.user?.isOwl ?? false)

export const useBunnies = () => useUser(state => state.user?.bunnies ?? [])

export const useAreThereBunnies = () =>
  useUser(state => (state.user?.bunnies?.length ?? 0) > 0)

export const useIsLogged = () =>
  useUser(state => !!state.bunnyId && !!state.user)
