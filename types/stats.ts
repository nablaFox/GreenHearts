import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface Stats {
  meals: number
  kcal: number
  workouts: number
  score: number
  greens: number
  reds: number
  blue: number
  grays: number
}

export interface StatsInDatabase extends Stats {
  date: FirebaseFirestoreTypes.Timestamp
}
