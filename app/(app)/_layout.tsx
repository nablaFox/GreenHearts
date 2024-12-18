import { Stack } from 'expo-router'
import React, { useEffect } from 'react'

import { usePosts } from '@/hooks/usePosts'
import { useColorScheme } from '@/libs/useColorScheme'

import { setDatetimePickerTheme } from '@/modules/datetime-picker'
import { useUser } from '@/hooks/useUser'
import { useStats } from '@/hooks/useStats'

import { NoSelectedBunnyHandler } from '@/components/ActionHandlers'
import { NoBunnyToChooseHandler } from '@/components/ActionHandlers'

export default function AppLayout() {
  const fetchPosts = usePosts(state => state.fetchPosts)
  const isDark = useColorScheme(state => state.isDark)
  const bunnyId = useUser(state => state.bunnyId)
  const fetchStats = useStats(state => state.fetchStats)

  const areThereBunnies = useUser(state => state.areThereBunnies())
  const isBunnySet = useUser(state => state.isBunnySet())
  const isOwl = useUser(state => state.isOwl())

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

  if (!areThereBunnies && isOwl) return <NoBunnyToChooseHandler />

  if (!isBunnySet && isOwl) return <NoSelectedBunnyHandler />

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="settings" options={screenTransition} />

      <Stack.Screen name="maker" options={screenTransition} />
    </Stack>
  )
}
