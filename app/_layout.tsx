import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'

import { SettingsHeader } from '@/components/SettingsHeader'

import '../global.css'
import { usePosts } from '@/hooks/usePosts'

export default function RootLayout() {
  const { fetchPosts } = usePosts()

  useEffect(() => fetchPosts(), [fetchPosts])

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{ header: () => <SettingsHeader /> }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </PaperProvider>
  )
}
