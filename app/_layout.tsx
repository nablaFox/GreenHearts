import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import SignIn from './sign-in'
import { SnackBar } from '@/components/SnackBar'
import { LoadingBar } from '@/components/LoadingBar'
import { FetchUserHandler } from '@/components/ActionHandlers'

import { useTheme } from '@/hooks/useTheme'
import { useUser } from '@/hooks/useUser'

import '../global.css'

export default function Root() {
  const { fetchUser, isLogged } = useUser()
  const { theme } = useTheme()

  // automatically try to get user; if it fails:
  // user will be inside <SignIn /> and have the possibility to call this again from login button
  useEffect(fetchUser)

  return (
    <PaperProvider theme={theme}>
      {isLogged ? <Slot /> : <SignIn />}

      <FetchUserHandler />
      <SnackBar />
      <LoadingBar />
      <StatusBar style="light" />
    </PaperProvider>
  )
}
