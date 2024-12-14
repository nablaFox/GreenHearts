import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import * as Errors from '@/constants/errors'

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

// API states
declare global {
  type ActionStatus = 'loading' | 'success'
  type FirebaseAuthErrors = keyof typeof Errors.FirebaseAuthErrors
  type FirebaseFirestoreErrors = keyof typeof Errors.FirebaseFirestoreErrors
  type GenericServerError = keyof typeof Errors.GenericServerErrors

  type FetchPostsError = keyof typeof Errors.FetchPostsErrors
  type VotePostError = keyof typeof Errors.VotePostErrors
  type AddPostError = keyof typeof Errors.AddPostErrors
  type FetchUserError = keyof typeof Errors.FetchUserErrors
  type LoginError = keyof typeof Errors.LoginErrors
  type LogoutError = keyof typeof Errors.LogoutErrors

  type FetchPostsStatus = ActionStatus | FetchPostsError
  type VotePostStatus = ActionStatus | VotePostError
  type AddPostStatus = ActionStatus | AddPostError
  type FetchUserStatus = ActionStatus | FetchUserError
  type LoginStatus = ActionStatus | LoginError
  type LogoutStatus = ActionStatus | LogoutError
}
