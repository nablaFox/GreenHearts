import React from 'react'
import { BottomNavigation, FAB } from 'react-native-paper'

import Index from './index'
import Posts from './posts'

import { useUser } from '@/hooks/useUser'
import { useRouter } from 'expo-router'

export default function TabLayout() {
  const [index, setIndex] = React.useState(0)

  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'heart' },
    { key: 'posts', title: 'Posts', focusedIcon: 'book' }
  ])

  const renderScene = BottomNavigation.SceneMap({
    home: Index,
    posts: Posts
  })

  const router = useRouter()

  const { isAdmin } = useUser()

  const isFABVisible = React.useMemo(
    () => !isAdmin && index > 0,
    [isAdmin, index]
  )

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
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
