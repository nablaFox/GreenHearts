import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

declare global {
  interface Post {
    key: string
    title?: string
    notes?: string
    green?: number
    blue?: number
    red?: number
    image?: string
    date?: FirebaseFirestoreTypes.Timestamp
    userDate?: FirebaseFirestoreTypes.Timestamp
  }
}
