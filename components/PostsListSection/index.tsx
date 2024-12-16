import { SectionList } from 'react-native'

import PostCard from './PostCard'
import { PostsListDivider } from './PostsListDivider'

import { usePostsByDay, usePosts } from '@/hooks/usePosts'

export default function PostsListSection() {
  const { fetchMorePosts } = usePosts()
  const postsByDay = usePostsByDay()

  // FIX: DOES NOT WORK

  return null

  return (
    <SectionList
      sections={postsByDay}
      keyExtractor={item => item.key}
      renderItem={({ item }) => <PostCard post={item} />}
      renderSectionFooter={({ section }) => (
        <PostsListDivider date={section.date} />
      )}
      onEndReached={() => fetchMorePosts()}
    />
  )
}
