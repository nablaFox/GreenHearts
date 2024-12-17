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
    firestore().settings({
      persistence: true
    })
  },

  FieldValue: firestore.FieldValue,

  Timestamp: firestore.Timestamp
}

export default client
