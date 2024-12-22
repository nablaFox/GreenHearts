import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

import { usePosts } from '@/hooks/usePosts'
import { useColorScheme } from '@/libs/useColorScheme'

import { setDatetimePickerTheme } from '@/modules/datetime-picker'
import { useUser } from '@/hooks/useUser'
import { useStats } from '@/hooks/useStats'
import { NoBunniesToChoose, NoBunnySet } from '@/components/ActionHandlers'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

export default function AppLayout() {
  const fetchPosts = usePosts(state => state.fetchPosts)
  const fetchStats = useStats(state => state.fetchStats)

  const isDark = useColorScheme(state => state.isDark)
  const bunnyId = useUser(state => state.bunnyId)
  const areThereBunnies = useUser(state => state.areThereBunnies())
  const isBunnySet = useUser(state => state.isBunnySet())

  useEffect(() => {
    if (bunnyId !== null) fetchPosts(bunnyId)
  }, [fetchPosts, bunnyId])

  useEffect(() => {
    if (bunnyId !== null) fetchStats(bunnyId)
  }, [fetchStats, bunnyId])

  useEffect(() => setDatetimePickerTheme(isDark), [isDark])

  // useErrorNotifier(fetchPostsStatus, {})
  // useErrorNotifier(fetchStatsStatus, {})

  const screenTransition = {
    headerShown: false,
    presentation: 'modal',
    animation: 'fade_from_bottom'
  }

  if (!areThereBunnies) return <NoBunniesToChoose />

  if (!isBunnySet) return <NoBunnySet />

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="settings" options={screenTransition} />

      <Stack.Screen name="maker" options={screenTransition} />
    </Stack>
  )
}
