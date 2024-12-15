import { Link } from 'expo-router'
import { View } from 'react-native'

import { FetchUserHandler } from '@/components/ActionHandlers'

export default function SignIn() {
  return (
    <View>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>

      <FetchUserHandler />
    </View>
  )
}
