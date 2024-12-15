import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import SignIn from './sign-in'
import { SnackBar } from '@/components/SnackBar'
import { LoadingBar } from '@/components/LoadingBar'

import { useTheme } from '@/hooks/useTheme'
import { useIsLogged, useUser } from '@/hooks/useUser'
import { firestore } from '@/api'

import { GoogleSignin } from '@react-native-google-signin/google-signin'

import '../global.css'

export default function Root() {
  const { theme } = useTheme()
  const isLogged = useIsLogged()

  const { fetchUser } = useUser()

  // automatically try to get user; if it fails:
  // user will be inside <SignIn /> and have the possibility to call this again from login button
  useEffect(() => {
    fetchUser()
    firestore.initialize()
    GoogleSignin.configure({ webClientId: process.env.EXPO_WEB_CLIENT_ID })
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
