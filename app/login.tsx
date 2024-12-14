import { Text } from 'react-native-paper'

import { ThemedView } from '@/components/Themed'

import { NoBunniesHandler } from '@/components/ActionHandlers'
import { NoBunnySetHandler } from '@/components/ActionHandlers'

export default function Login() {
  return (
    <ThemedView>
      <Text>Login</Text>

      <NoBunnySetHandler />
      <NoBunniesHandler />
    </ThemedView>
  )
}
