import { Redirect, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { t } from '@lingui/core/macro'

import { usePosts } from '@/hooks/usePosts'
import { useColorScheme } from '@/libs/useColorScheme'

import { setDatetimePickerTheme } from '@/modules/datetime-picker'
import { useUser } from '@/hooks/useUser'
import { useStats } from '@/hooks/useStats'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

import { NoBunniesToChoose, NoBunnySet } from '@/components/ActionHandlers'

export default function AppLayout() {
  const fetchPosts = usePosts(state => state.fetchPosts)
  const fetchBunny = useUser(state => state.fetchBunny)
  const fetchStats = useStats(state => state.fetchStats)

  const fetchPostsStatus = usePosts(state => state.fetchPostsStatus)
  const fetchStatsStatus = useStats(state => state.fetchStatsStatus)
  const fetchUserStatus = useUser(state => state.fetchUserStatus)
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

  useEffect(() => {
    if (bunnyId !== null) fetchBunny(bunnyId)
  }, [fetchBunny, bunnyId])

  useEffect(() => setDatetimePickerTheme(isDark), [isDark])

  useErrorNotifier(fetchPostsStatus, { origin: t`fetching posts` })

  useErrorNotifier(fetchStatsStatus, { origin: t`fetching stats` })

  useErrorNotifier(fetchUserStatus, {
    exclude: ['firestore/not-found', 'firestore/permission-denied'],
    origin: t`fetching bunny user`
  })

  if (!areThereBunnies) return <NoBunniesToChoose />

  if (!isBunnySet) return <NoBunnySet />

  if (fetchUserStatus === 'firestore/not-found')
    return <Redirect href="/sign-up" />

  if (fetchUserStatus !== 'success') return <Redirect href="/sign-in" />

  const screenTransition = {
    headerShown: false,
    presentation: 'modal',
    animation: 'fade_from_bottom'
  } as const

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="settings" options={screenTransition} />

      <Stack.Screen name="maker" options={screenTransition} />
    </Stack>
  )
}
