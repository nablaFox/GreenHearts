import React from 'react'
import { BottomNavigation, FAB, TouchableRipple } from 'react-native-paper'

import Index from './index'
import Posts from './posts'
import Bunnies from './bunnies'

import { useIsOwl } from '@/hooks/useUser'
import { useRouter } from 'expo-router'

export default function TabLayout() {
  const [index, setIndex] = React.useState(0)

  const isOwl = useIsOwl()

  const routes = [
    { key: 'home', title: 'Home', focusedIcon: 'heart' },
    { key: 'posts', title: 'Posts', focusedIcon: 'book' }
  ]

  if (isOwl) {
    routes.push({ key: 'bunnies', title: 'Bunnies', focusedIcon: 'rabbit' })
  }

  const renderScene = BottomNavigation.SceneMap({
    home: Index,
    posts: Posts,
    bunnies: Bunnies
  })

  const router = useRouter()

  const isFABVisible = React.useMemo(() => !isOwl && index > 0, [isOwl, index])

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTouchable={({ key, ...props }) => (
          <TouchableRipple key={key} {...props} />
        )}
      />
      {isFABVisible && (
        <FAB
          icon="plus"
          onPress={() => {
            router.push('/maker')
          }}
          style={{
            position: 'absolute',
            right: 30,
            bottom: 100
          }}
        />
      )}
    </>
  )
}
