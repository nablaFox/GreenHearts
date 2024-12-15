import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { FetchUserHandler } from '@/components/ActionHandlers'
import { useUser } from '@/hooks/useUser'

export default function SignIn() {
  const { login, user } = useUser()

  const onLogin = async () => {
    const res = await login()

    if (res === 'success') {
      console.log('login success')
      console.log(user)
    }

    if (res === 'no-id-token') {
      console.log('no id token')
    }
  }

  return (
    <View className="pt-16 px-8">
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
      <Button>Register</Button>

      <FetchUserHandler />
    </View>
  )
}
