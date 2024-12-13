import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'

import Login from './login'
import { ThemedSnackbar } from '@/components/Themed'
import { Loaderbar } from '@/components/Loaderbar'
import { LoadingSplash } from '@/components/LoadingSplash'

import { useTheme } from '@/hooks/useTheme'
import { useUser } from '@/hooks/useUser'

import '../global.css'

export default function Root() {
  const { fetchUser, isLogged, fetchUserStatus } = useUser()
  const { theme } = useTheme()

  useEffect(fetchUser)

  return (
    <PaperProvider theme={theme}>
      {fetchUserStatus === 'loading' ? (
        <LoadingSplash />
      ) : isLogged ? (
        <Slot />
      ) : (
        <Login />
      )}

      <ThemedSnackbar />
      <Loaderbar />
      <StatusBar style="light" />
    </PaperProvider>
  )
}
