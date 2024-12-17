import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { I18nProvider } from '@lingui/react'

import SignIn from './sign-in'
import { SnackBar } from '@/components/SnackBar'
import { LoadingBar } from '@/components/LoadingBar'

import { i18n, initI18n } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { useUser } from '@/hooks/useUser'
import { initAuth } from '@/libs/nativeAuth'
import { firestore } from '@/api'

import '../global.css'

firestore.initialize()

initAuth()

initI18n('en')

export default function Root() {
  const { theme } = useTheme()
  const isLogged = useUser(state => state.isLogged())

  const fetchUser = useUser(state => state.fetchUser)

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <PaperProvider theme={theme}>
      <I18nProvider i18n={i18n}>
        {isLogged ? <Slot /> : <SignIn />}

        <SnackBar />
        <LoadingBar />
        <StatusBar style="light" />
      </I18nProvider>
    </PaperProvider>
  )
}
