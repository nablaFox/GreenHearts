import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import Login from './login'
import { SnackBar } from '@/components/SnackBar'
import { LoadingBar } from '@/components/LoadingBar'
import { FetchUserHandler } from '@/components/ActionHandlers'

import { useTheme } from '@/hooks/useTheme'
import { useUser } from '@/hooks/useUser'

import '../global.css'

export default function Root() {
  const { fetchUser, isLogged } = useUser()
  const { theme } = useTheme()

  useEffect(fetchUser)

  return (
    <PaperProvider theme={theme}>
      {isLogged ? <Slot /> : <Login />}

      <FetchUserHandler />
      <SnackBar />
      <LoadingBar />
      <StatusBar style="light" />
    </PaperProvider>
  )
}
