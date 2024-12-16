import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import firestore from '@react-native-firebase/firestore'
import contract from './contract'

type ExtractParams<T> = T extends { params: infer P } ? P : never

export const client = {
  user: (params: ExtractParams<(typeof contract)['user']>) => {
    return firestore()
      .collection('users')
      .doc(
        params.userId
      ) as FirebaseFirestoreTypes.DocumentReference<UserInDatabase>
  },

  posts: (params: ExtractParams<(typeof contract)['posts']>) => {
    return firestore()
      .collection('users')
      .doc(params.userId)
      .collection('posts') as FirebaseFirestoreTypes.CollectionReference<Post>
  },

  post: (params: ExtractParams<(typeof contract)['post']>) => {
    return firestore()
      .collection('users')
      .doc(params.userId)
      .collection('posts')
      .doc(params.postId) as FirebaseFirestoreTypes.DocumentReference<Post>
  },

  dailyStats: (params: ExtractParams<(typeof contract)['dailyStats']>) => {
    return firestore()
      .collection('users')
      .doc(params.userId)
      .collection('stats')
      .doc(params.date) as FirebaseFirestoreTypes.DocumentReference<Stats>
  },

  initialize: async () => {
    await firestore().settings({
      persistence: true
    })
  }
}

export default client
