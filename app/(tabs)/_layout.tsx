import { Tabs } from 'expo-router'
import React from 'react'
import IconSymbol from '@expo/vector-icons/Ionicons'

import { HomeHeader } from '@/components/HomeHeader'
import { PostsHeader } from '@/components/PostsHeader'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          header: () => <HomeHeader />,
          tabBarIcon: ({ color }) => (
            <IconSymbol name="home-sharp" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: 'Posts',
          header: () => <PostsHeader />,
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="information-circle-sharp"
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
