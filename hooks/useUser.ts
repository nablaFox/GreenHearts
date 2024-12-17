import { firestore } from '@/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'

import { create } from 'zustand'

type FetchUserStatus = ActionStatus<
  'first-time-user' | 'no-bunny' | 'no-bunnies' | 'not-found' | 'firebase-error'
>

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
  isOwl: () => boolean
  areThereBunnies: () => boolean
  isLogged: () => boolean
}

export const useUser = create<UserStoreState>((set, get) => ({
  bunnyId: null,
  user: null,
  fetchUserStatus: 'success',
  firebaseSubscriber: null,

  setFirebaseCallback: (userId: string) => {
    const previousCallback = get().firebaseSubscriber

    if (previousCallback) {
      previousCallback()
    }

    const subscriber = firestore.user({ userId }).onSnapshot(
      doc => {
        const user = doc?.data()

        if (!user) return

        set({ user: { ...user, key: doc.id } })

        if (!user.isOwl) set({ fetchUserStatus: 'success' })

        if (!user.bunnies?.length) {
          return set({ fetchUserStatus: 'no-bunnies' })
        }

        if (!get().bunnyId) {
          return set({ fetchUserStatus: 'no-bunny' })
        }

        set({ fetchUserStatus: 'success' })
      },
      error => {
        set({ fetchUserStatus: 'firebase-error' })
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

    get().setFirebaseCallback(authUser.uid)

    if (!userData.isOwl) {
      return get().setBunnyId(authUser.uid)
    }

    const bunnyId = await AsyncStorage.getItem('bunnyId').catch(() => null)

    if (!userData.bunnies?.length) {
      return set({ fetchUserStatus: 'no-bunnies' })
    }

    if (!bunnyId || !userData.bunnies.includes(bunnyId)) {
      return set({ fetchUserStatus: 'no-bunny' })
    }

    get().setBunnyId(bunnyId)
  },

  setBunnyId: (bunnyId: string) => {
    const status = get().fetchUserStatus

    if (status === 'no-bunny') set({ fetchUserStatus: 'success' })

    set({ bunnyId })
  },

  addUser: async params => {
    const userId = auth().currentUser?.uid

    if (!userId) return

    set({ fetchUserStatus: 'loading' })

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
  },

  isOwl: () => get().user?.isOwl ?? false,

  areThereBunnies: () => (get().user?.bunnies?.length ?? 0) > 0,

  isLogged: () => !!get().bunnyId && !!get().user
}))
