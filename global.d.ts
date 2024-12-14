import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import * as Errors from '@/api/gh/errors'
import * as FirebaseErrors from '@/api/firebase/errors'

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
}

// an error is everything that is not a success or a loading
declare global {
  type ActionStatus = 'loading' | 'success'

  type FetchPostsError = FirebaseErrors.FirestoreError
  type FetchPostsStatus = ActionStatus | FetchPostsError

  type AddPostError = Errors.AddPostError
  type AddPostStatus = ActionStatus | AddPostError

  type VotePostError = Errors.VotePostError
  type VotePostStatus = ActionStatus | VotePostError

  type FetchUserError =
    | FirebaseErrors.FirebaseAuthError
    | 'first-time-user'
    | 'no-bunny'
    | 'no-bunnies'
  type FetchUserStatus = ActionStatus | FetchUserError

  type LoginError = FirebaseErrors.FirebaseAuthError
  type LoginStatus = ActionStatus | LoginError

  type LogoutError = FirebaseErrors.FirebaseAuthError
  type LogoutStatus = ActionStatus | LogoutError
}
