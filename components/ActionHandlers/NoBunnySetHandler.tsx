import { useUser } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

// full screen
// provide a button to choose a bunny;
export function NoBunnySetHandler() {
  const { fetchUserStatus, setBunnyId } = useUser()

  if (fetchUserStatus !== 'no-bunny') return null

  return <Text>Welcome back! Please choose a bunny to continue</Text>
}
