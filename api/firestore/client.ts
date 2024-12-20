import firestore from '@react-native-firebase/firestore'
import contract from './contract'
import { createFirestoreRef } from '@/libs/firebaseClient'

const client = {
  user: createFirestoreRef(contract, 'user', true),
  posts: createFirestoreRef(contract, 'posts', false),
  post: createFirestoreRef(contract, 'post', true),
  stats: createFirestoreRef(contract, 'stats', false),
  todayStats: createFirestoreRef(contract, 'todayStats', true),

  initialize: async () => {
    if (__DEV__) {
      firestore().useEmulator(
        process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_HOST!,
        parseInt(process.env.EXPO_PUBLIC_FIRESTORE_EMULATOR_PORT!)
      )
    }

    firestore().settings({
      persistence: true
    })
  },

  FieldValue: firestore.FieldValue,

  Timestamp: firestore.Timestamp
}

export default client
