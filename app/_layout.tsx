import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { PaperProvider } from 'react-native-paper'

import '../global.css'
import { usePosts } from '@/hooks/usePosts'

import { ThemedSnackbar } from '@/components/Themed'
import { Loaderbar } from '@/components/Loaderbar'

export default function RootLayout() {
  const { fetchPosts } = usePosts()

  useEffect(() => fetchPosts(), [fetchPosts])

  const screenTransition = {
    headerShown: false,
    presentation: 'modal',
    animation: 'fade_from_bottom'
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="settings" options={screenTransition} />

        <Stack.Screen name="maker" options={screenTransition} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />

      <ThemedSnackbar />
      <Loaderbar />
    </PaperProvider>
  )
}
