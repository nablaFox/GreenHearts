import { FlatList } from 'react-native'

import PostCard from './PostCard'

import { usePosts } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'

export default function PostsListSection() {
  const { fetchMorePosts } = usePosts()
  const posts = usePosts(state => state.posts)
  const bunnyId = useUser(state => state.bunnyId!)

  const onEndReached = () => {
    fetchMorePosts(bunnyId)
  }

  return (
    <FlatList
      className="h-96"
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={item => item.key}
      onEndReached={onEndReached}
    />
  )
}
