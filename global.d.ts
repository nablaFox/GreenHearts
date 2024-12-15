import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { FirebaseErrors } from '@/api'

declare global {
  enum Heart {
    Green = 1,
    Blue = 0.25,
    Red = -1,
    Gray = 0
  }

  const AssignableHearts = [Heart.Green, Heart.Blue, Heart.Red]

  interface PostInDatabase {
    title?: string
    notes?: string
    heart?: Heart
    image?: string
    date?: FirebaseFirestoreTypes.Timestamp
    userDate?: FirebaseFirestoreTypes.Timestamp
  }

  interface Post extends PostInDatabase {
    key: string
    verified?: boolean
  }

  interface CreatePostParams {
    title?: string
    notes?: string
    imageUri?: string
    date?: Date // Maybe
  }

  interface User {}
}

// an error is everything that is not a success or a loading
declare global {
  type ActionStatus = 'loading' | 'success'

  type FetchPostsStatus = ActionStatus | FirebaseErrors.FirestoreError

  type AddPostStatus = ActionStatus | FirebaseErrors.FirestoreError

  type VotePostStatus = ActionStatus | FirebaseErrors.FirestoreError

  type FetchUserStatus =
    | ActionStatus
    | FirebaseErrors.FirebaseAuthError
    | 'first-time-user'
    | 'no-bunny'
    | 'no-bunnies'

  type LoginStatus = ActionStatus | FirebaseErrors.FirebaseAuthError

  type LogoutStatus = ActionStatus | FirebaseErrors.FirebaseAuthError
}
