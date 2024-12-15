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
  login: () => Promise<LoginStatus>
  logout: () => Promise<LogoutStatus>
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

    const subscriber = firestore.posts({ userId }).onSnapshot(
      doc => {
        // ...

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

    const userDoc = await firestore.user({ key: authUser.uid }).get()

    if (!userDoc.exists) {
      return set({ fetchUserStatus: 'not-found' })
    }

    const userData = userDoc.data()

    if (!userData) {
      return set({ fetchUserStatus: 'not-found' })
    }

    set({ user: userData })

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

  login: async (): Promise<LoginStatus> => {
    // try authentication

    get().fetchUser()
    return 'success'
  },

  logout: async (): Promise<LogoutStatus> => {
    // try logout

    set({ bunnyId: null })
    set({ user: null })
    get().firebaseSubscriber?.()
    return 'success'
  },

  setBunnyId: (bunnyId: string) => {
    set({ bunnyId })
    get().setFirebaseCallback(bunnyId)
  }
}))

export const useIsOwl = () => useUser(state => state.user?.isOwl ?? false)

export const useAuthUserId = () =>
  useUser(() => auth().currentUser?.uid ?? null)

export const useBunnies = () => useUser(state => state.user?.bunnies ?? [])

export const useAreThereBunnies = () =>
  useUser(state => (state.user?.bunnies?.length ?? 0) > 0)

export const useIsLogged = () =>
  useUser(state => !!state.bunnyId && !!state.user)
