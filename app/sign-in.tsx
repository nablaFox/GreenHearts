import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { FetchUserHandler, AddUserHandler } from '@/components/ActionHandlers'
import { useUser } from '@/hooks/useUser'
import { loginWithGoogle } from '@/libs/nativeAuth'

import { showSnackBar } from '@/hooks/useSnackBar'

export default function SignIn() {
  const { fetchUser } = useUser()

  const authenticateUser = async () => {
    const res = await loginWithGoogle()

    if (res === 'auth/invalid-id-token') {
      return showSnackBar({ description: 'No id token!' })
    }

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

      <AddUserHandler />
      <FetchUserHandler />
    </View>
  )
}
