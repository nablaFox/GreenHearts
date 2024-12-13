import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { scores, colors } from '@/constants/scores'
import * as Errors from '@/constants/errors'

declare global {
  type HeartScore = (typeof scores)[number]

  type HeartColor = (typeof colors)[number]

  interface PostInDatabase {
    title?: string
    notes?: string
    score?: HeartScore
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
  type APIStatus = 'loading' | 'success'
  type FirebaseAuthErrors = keyof typeof Errors.FirebaseAuthErrors
  type FirebaseFirestoreErrors = keyof typeof Errors.FirebaseFirestoreErrors
  type GenericServerError = keyof typeof Errors.GenericServerErrors

  type FetchPostsStatus = APIStatus | keyof typeof Errors.FetchPostsErrors

  type VotePostStatus = APIStatus | keyof typeof Errors.VotePostErrors

  type AddPostStatus = APIStatus | keyof typeof Errors.AddPostErrors

  type FetchUserStatus = APIStatus | keyof typeof Errors.FetchUserErrors

  type LoginStatus = APIStatus | keyof typeof Errors.LoginErrors
}
