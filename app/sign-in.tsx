import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { useUser } from '@/hooks/useUser'
import { loginWithGoogle } from '@/libs/nativeAuth'

export default function SignIn() {
  const fetchUser = useUser(state => state.fetchUser)

  const authenticateUser = async () => {
    const res = await loginWithGoogle()

    if (res !== 'ok') {
      alert('Failed to authenticate user')
      alert(res)
      return
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
    </View>
  )
}
