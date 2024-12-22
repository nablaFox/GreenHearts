import { useUser } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

export function NoBunniesToChoose() {
  const { fetchUser } = useUser()

  // TODO: provide a button to refetch the user data

  return (
    <Text>No bunnies! Share your id so they can add you as their owl!</Text>
  )
}
