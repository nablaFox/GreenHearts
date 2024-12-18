import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { FetchUserHandler } from '@/components/ActionHandlers'
import { useUser } from '@/hooks/useUser'
import { loginWithGoogle } from '@/libs/nativeAuth'

export default function SignIn() {
  const fetchUser = useUser(state => state.fetchUser)

  const authenticateUser = async () => {
    await loginWithGoogle()
    fetchUser()
  }

  return (
    <View className="pt-16 px-8">
      <Button mode="contained" onPress={authenticateUser}>
        Login
      </Button>

      <Button mode="outlined" onPress={authenticateUser}>
        Register
      </Button>

      <FetchUserHandler />
    </View>
  )
}
