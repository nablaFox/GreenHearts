import { useUser, useAuthUserId } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

export function NoBunniesHandler() {
  const { fetchUser } = useUser()
  const authUserId = useAuthUserId()

  // TODO: provide a button to refetch the user data

  return (
    <Text>
      No bunnies! Share your id {authUserId} so they can add you as their owl!
    </Text>
  )
}
