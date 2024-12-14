import { useUser } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

export function NoBunniesHandler() {
  const { authUser, fetchUserStatus } = useUser()

  if (fetchUserStatus !== 'no-bunnies') return null

  return (
    <Text>
      No bunnies! Share your id {authUser.id} so they can add you as their owl!
    </Text>
  )
}
