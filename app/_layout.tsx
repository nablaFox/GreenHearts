import { Slot } from 'expo-router'
import { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { I18nProvider } from '@lingui/react'

import SignIn from './sign-in'
import Register from './register'
import { SnackBar } from '@/components/SnackBar'
import { SplashScreen } from '@/components/SplashScreen'

import { i18n, initI18n } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { useUser, type FetchUserStatus } from '@/hooks/useUser'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'
import { initAuth } from '@/libs/nativeAuth'
import { firestore } from '@/api'
import { t } from '@lingui/core/macro'

import '@/assets/global.css'

firestore.initialize()

initAuth()

initI18n()

export default function Root() {
  const { theme } = useTheme()

  const fetchUser = useUser(state => state.fetchUser)
  const fetchUserStatus = useUser(state => state.fetchUserStatus)

  useErrorNotifier(fetchUserStatus, {
    exclude: ['firestore/not-found', 'firestore/permission-denied'],
    origin: t`fetching user`
  })

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const renderSwitch = (fetchUserStatus: FetchUserStatus) => {
    if (fetchUserStatus === 'success') return <Slot />

    if (fetchUserStatus === 'idle' || fetchUserStatus === 'loading')
      return <SplashScreen />

    if (fetchUserStatus === 'firestore/not-found') return <Register />

    return <SignIn />
  }

  return (
    <PaperProvider theme={theme}>
      <I18nProvider i18n={i18n}>
        {renderSwitch(fetchUserStatus)}

        <StatusBar style="light" />
        <SnackBar />
      </I18nProvider>
    </PaperProvider>
  )
}
