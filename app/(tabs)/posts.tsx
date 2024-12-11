import { View } from 'react-native'
import { PostsHeader } from '@/components/PostsHeader'

import { PostsList } from '@/components/PostsList'

export default function Posts() {
  return (
    <View>
      <PostsHeader />
      <PostsList />
    </View>
  )
}
