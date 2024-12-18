import { useUser } from '@/hooks/useUser'

import { Text } from 'react-native-paper'

// should override the UserNotFound view
export function Success() {
  // provide a button to fetch the user and log in
  const fetchUser = useUser(state => state.fetchUser)

  return <Text>Adding user is succesfull</Text>
}
