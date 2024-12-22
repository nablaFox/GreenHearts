import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { I18nProvider } from '@lingui/react'

import { SnackBar } from '@/components/SnackBar'
import { SplashGate } from '@/components/SplashGate'

import { i18n, initI18n } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { initAuth } from '@/libs/nativeAuth'
import { firestore } from '@/api'

import '@/assets/global.css'

firestore.initialize()

initAuth()

initI18n()

export default function Root() {
  const { theme } = useTheme()

  return (
    <PaperProvider theme={theme}>
      <I18nProvider i18n={i18n}>
        <SplashGate />
        <StatusBar style="light" />
        <SnackBar />
      </I18nProvider>
    </PaperProvider>
  )
}
