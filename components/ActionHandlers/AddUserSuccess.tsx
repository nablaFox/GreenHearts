import { useUser } from '@/hooks/useUser'

import { Text, Button } from 'react-native-paper'
import { View } from 'react-native'

export function AddUserSuccess() {
  const fetchAuthUser = useUser(state => state.fetchAuthUser)

  return (
    <View>
      <Text>Adding user is succesfull</Text>
      <Button onPress={fetchAuthUser}>Get in</Button>
    </View>
  )
}
