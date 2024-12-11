import React from 'react'

import { BottomNavigation, FAB } from 'react-native-paper'

import Index from './index'
import Posts from './posts'

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

  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          right: 30,
          bottom: 100
        }}
      />
    </>
  )
}
