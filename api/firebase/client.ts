import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import firestore from '@react-native-firebase/firestore'
import contract from './contract'

type ExtractParams<T> = T extends { params: infer P } ? P : never

export const client = {
  user: (params: ExtractParams<(typeof contract)['user']>) => {
    return firestore().doc(
      contract.user.path.replace('{key}', params.key)
    ) as FirebaseFirestoreTypes.DocumentReference<User>
  },

  posts: (params: ExtractParams<(typeof contract)['posts']>) => {
    return firestore().collection(
      contract.posts.path.replace('{userId}', params.userId)
    ) as FirebaseFirestoreTypes.CollectionReference<Post>
  },

  post: (params: ExtractParams<(typeof contract)['post']>) => {
    return firestore().doc(
      contract.post.path
        .replace('{userId}', params.userId)
        .replace('{postId}', params.postId)
    ) as FirebaseFirestoreTypes.DocumentReference<Post>
  },

  dailyStats: (params: ExtractParams<(typeof contract)['dailyStats']>) => {
    return firestore().doc(
      contract.dailyStats.path
        .replace('{userId}', params.userId)
        .replace('{date}', params.date)
    ) as FirebaseFirestoreTypes.DocumentReference<Stats>
  },

  initialize: async () => {
    await firestore().settings({
      persistence: true
    })
  }
}

export default client
