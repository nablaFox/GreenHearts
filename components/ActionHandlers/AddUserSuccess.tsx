import { useUser } from '@/hooks/useUser'

import { Text, Button } from 'react-native-paper'
import { View } from 'react-native'

export function AddUserSuccess() {
  const fetchUser = useUser(state => state.fetchUser)

  return (
    <View>
      <Text>Adding user is succesfull</Text>
      <Button onPress={fetchUser}>Get in</Button>
    </View>
  )
}
