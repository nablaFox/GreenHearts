import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { Heart } from './enums'

export interface PostInDatabase {
  title?: string
  notes?: string
  heart?: Heart
  image?: string
  date?: FirebaseFirestoreTypes.Timestamp
  userDate?: FirebaseFirestoreTypes.Timestamp
}

export interface Post extends PostInDatabase {
  key: string
  isHeader?: boolean
}
