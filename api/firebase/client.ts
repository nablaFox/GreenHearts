import firestore from '@react-native-firebase/firestore'
import contract from './contract'
import { createFirestoreRef } from '@/libs/firestoreClient'

const client = {
  user: createFirestoreRef(contract, 'user', true),
  posts: createFirestoreRef(contract, 'posts', false),
  post: createFirestoreRef(contract, 'post', true),
  todayStats: createFirestoreRef(contract, 'todayStats', true),
  thisWeekStats: createFirestoreRef(contract, 'thisWeekStats', true),
  thisMonthStats: createFirestoreRef(contract, 'thisMonthStats', true),

  initialize: async () => {
    firestore().settings({
      persistence: true
    })
  },

  FieldValue: firestore.FieldValue,

  Timestamp: firestore.Timestamp
}

export default client
