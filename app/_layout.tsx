import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import SignIn from './sign-in'
import { SnackBar } from '@/components/SnackBar'
import { LoadingBar } from '@/components/LoadingBar'

import { useTheme } from '@/hooks/useTheme'
import { useUser } from '@/hooks/useUser'
import { initAuth } from '@/libs/nativeAuth'
import { firestore } from '@/api'

import '../global.css'

export default function Root() {
  const { theme } = useTheme()
  const isLogged = useUser(state => state.isLogged())

  firestore.initialize()

  const fetchUser = useUser(state => state.fetchUser)

  useEffect(initAuth, [initAuth])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <PaperProvider theme={theme}>
      {isLogged ? <Slot /> : <SignIn />}

      <SnackBar />
      <LoadingBar />
      <StatusBar style="light" />
    </PaperProvider>
  )
}
