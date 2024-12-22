import * as RNSS from 'expo-splash-screen'
import { Slot, Stack } from 'expo-router'
import { useEffect, useState } from 'react'

import { useUser } from '@/hooks/useUser'

import { SplashScreen } from '@/components/SplashScreen'

RNSS.preventAutoHideAsync().catch(() => {})

export function SplashGate() {
  const fetchAuthUser = useUser(state => state.fetchAuthUser)

  const [isNativeSplashHidden, setNativeSplashHidden] = useState(false)
  const [showReactSplash, setShowReactSplash] = useState(true)

  useEffect(() => {
    ;(async () => {
      await fetchAuthUser()

      await RNSS.hideAsync()
      setNativeSplashHidden(true)
    })()
  }, [fetchAuthUser])

  if (!isNativeSplashHidden) return null

  if (showReactSplash)
    return <SplashScreen onAnimationEnd={() => setShowReactSplash(false)} />

  return <Slot />
}
