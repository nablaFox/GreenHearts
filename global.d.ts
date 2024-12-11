import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { scores, colors } from '@/constants/common'

declare global {
  type HeartScore = (typeof scores)[number]

  type HeartColor = (typeof colors)[number]

  type FirebaseError = string // TEMP

  interface Post {
    key: string
    title?: string
    notes?: string
    score?: HeartScore
    image?: string
    date?: FirebaseFirestoreTypes.Timestamp
    userDate?: FirebaseFirestoreTypes.Timestamp
  }
}
