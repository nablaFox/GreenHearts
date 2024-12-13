import { useUser } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

export function NoBunnies() {
  const { authUser } = useUser()

  return (
    <Text>
      No bunnies! Share your id {authUser.id} so they can add you as their owl!
    </Text>
  )
}
