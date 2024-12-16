import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { FetchUserHandler } from '@/components/ActionHandlers'
import { useUser } from '@/hooks/useUser'
import { useAuth } from '@/libs/useAuth'

import { showSnackBar } from '@/hooks/useSnackBar'

export default function SignIn() {
  const { loginWithGoogle } = useAuth()
  const { fetchUser } = useUser()

  const authenticateUser = async () => {
    const res = await loginWithGoogle()

    if (res === 'no-id-token') {
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

      <FetchUserHandler />
    </View>
  )
}
