import type { UserInDatabase, PostInDatabase, StatsInDatabase } from '@/types'
import Firestore from '@react-native-firebase/firestore'
import { createFirestoreRef } from '@/libs/firebaseClient'

const contract = {
  user: {
    path: 'users/{userId}',
    params: {} as { userId: string },
    docType: {} as UserInDatabase
  },
  posts: {
    path: 'users/{userId}/posts',
    params: {} as { userId: string },
    docType: {} as PostInDatabase
  },
  post: {
    path: 'users/{userId}/posts/{postId}',
    params: {} as { userId: string; postId: string },
    docType: {} as PostInDatabase
  },

  todayStats: {
    path: () => {
      const today = new Date()
      const day = today.getDate()
      const month = today.getMonth() + 1
      const year = today.getFullYear()

      return `users/{userId}/stats/${year}${month}${day}`
    },
    params: {} as { userId: string },
    docType: {} as StatsInDatabase
  },

  stats: {
    path: 'users/{userId}/stats',
    params: {} as { userId: string },
    docType: {} as StatsInDatabase
  }
}

export const firestore = {
  user: createFirestoreRef(contract, 'user', true),
  posts: createFirestoreRef(contract, 'posts', false),
  post: createFirestoreRef(contract, 'post', true),
  stats: createFirestoreRef(contract, 'stats', false),
  todayStats: createFirestoreRef(contract, 'todayStats', true),

  initialize: async () => {
    if (__DEV__) {
      return Firestore().useEmulator(
        process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST!,
        parseInt(process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_PORT!)
      )
    }

    Firestore().settings({
      persistence: true
    })
  },

  FieldValue: Firestore.FieldValue,

  Timestamp: Firestore.Timestamp
}
