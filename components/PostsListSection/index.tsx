import { FlatList, View } from 'react-native'

import PostCard from './PostCard'
import { PostsSkeleton } from './PostsSkeleton'

import { usePosts } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'

export default function PostsListSection() {
  const fetchMorePosts = usePosts(state => state.fetchMorePosts)

  const fetchPostsStatus = usePosts(state => state.fetchPostsStatus)
  const posts = usePosts(state => state.posts)
  const bunnyId = useUser(state => state.bunnyId!)

  const onEndReached = () => {
    fetchMorePosts(bunnyId)
  }

  return (
    <View>
      <FlatList
        className="h-96"
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.key}
        onEndReached={onEndReached}
      />

      {fetchPostsStatus === 'loading' && <PostsSkeleton />}
    </View>
  )
}
