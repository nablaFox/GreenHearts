import { Text } from 'react-native-paper'
import { FlatList } from 'react-native'

import { usePosts } from '@/hooks/usePosts'

export function PostsList() {
  const { posts } = usePosts()

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  )
}
