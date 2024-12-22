import { View } from 'react-native'
import { Button } from 'react-native-paper'

import { useUser } from '@/hooks/useUser'
import { loginWithGoogle } from '@/libs/nativeAuth'
import { useSnackBar } from '@/hooks/useSnackBar'
import { t } from '@lingui/core/macro'
import { router } from 'expo-router'

export default function SignIn() {
  const fetchAuthUser = useUser(state => state.fetchAuthUser)
  const addKnownError = useSnackBar(state => state.addKnownError)

  const authenticateUser = async () => {
    const res = await loginWithGoogle()

    if (res !== 'ok') {
      return addKnownError({ description: res }, t`authenticating user`)
    }

    await fetchAuthUser()
    router.replace('/(app)/(tabs)')
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
