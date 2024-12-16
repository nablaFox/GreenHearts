import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

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
  }

  interface Stats {
    meals: number
    kcal: number
    workouts: number
    score: number
    greens: number
    reds: number
    blue: number
    grays: number
  }

  interface UserInDatabase {
    isOwl?: boolean
    bunnies?: string[]
    username?: string
  }

  interface User extends UserInDatabase {
    key: string
  }

  type ActionStatus<T> = 'loading' | 'success' | T

  type ActionResult<T> = void | T
}
