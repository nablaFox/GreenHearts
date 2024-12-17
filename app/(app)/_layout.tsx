import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

import { usePosts } from '@/hooks/usePosts'
import { useColorScheme } from '@/libs/useColorScheme'

import { setDatetimePickerTheme } from '@/modules/datetime-picker'
import { useUser } from '@/hooks/useUser'
import { useStats } from '@/hooks/useStats'

export default function AppLayout() {
  const fetchPosts = usePosts(state => state.fetchPosts)
  const isDark = useColorScheme(state => state.isDark)
  const bunnyId = useUser(state => state.bunnyId)
  const fetchStats = useStats(state => state.fetchStats)

  useEffect(() => {
    if (bunnyId !== null) fetchPosts(bunnyId)
  }, [fetchPosts, bunnyId])

  useEffect(() => {
    if (bunnyId !== null) fetchStats(bunnyId)
  }, [fetchStats, bunnyId])

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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="settings" options={screenTransition} />

      <Stack.Screen name="maker" options={screenTransition} />
    </Stack>
  )
}
