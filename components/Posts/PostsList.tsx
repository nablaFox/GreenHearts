import { SectionList } from 'react-native'

import PostCard from './PostCard'
import { PostListDivider } from './PostListDivider'

import { usePosts } from '@/hooks/usePosts'

export function PostsList() {
  const { postsByDay, fetchMorePosts } = usePosts()

  return (
    <SectionList
      sections={postsByDay}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <PostCard post={item} />}
      SectionSeparatorComponent={() => <PostListDivider />}
      onEndReached={() => fetchMorePosts()}
    />
  )
}
