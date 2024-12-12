import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'

import { usePosts } from '@/hooks/usePosts'
import { useColorScheme } from '@/hooks/useColorScheme'

import { setDatetimePickerTheme } from '@/modules/datetime-picker'

export default function AppLayout() {
  const { fetchPosts } = usePosts()
  const { isDark } = useColorScheme()

  useEffect(() => fetchPosts(), [fetchPosts])

  useEffect(() => {
    setDatetimePickerTheme(isDark)
  }, [isDark])

  const screenTransition = {
    headerShown: false,
    presentation: 'modal',
    animation: 'fade_from_bottom'
  }

  return (
    <Stack>
      <Stack.Screen name="login" />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="settings" options={screenTransition} />

      <Stack.Screen name="maker" options={screenTransition} />

      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
