import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { useUser } from '@/hooks/useUser'
import { loginWithGoogle } from '@/libs/nativeAuth'
import { useSnackBar } from '@/hooks/useSnackBar'
import { t } from '@lingui/core/macro'

export default function SignIn() {
  const fetchUser = useUser(state => state.fetchUser)
  const addKnownError = useSnackBar(state => state.addKnownError)

  const authenticateUser = async () => {
    const res = await loginWithGoogle()

    if (res !== 'ok') {
      return addKnownError({ description: res }, t`authenticating user`)
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
