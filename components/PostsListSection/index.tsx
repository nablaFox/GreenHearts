import { FlatList } from 'react-native'

import PostCard from './PostCard'

import { usePosts } from '@/hooks/usePosts'

export default function PostsListSection() {
  const { fetchMorePosts } = usePosts()
  const posts = usePosts(state => state.posts)

  return (
    <FlatList
      className="h-96"
      data={posts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={item => item.key}
      onEndReached={() => fetchMorePosts()}
    />
  )
}
