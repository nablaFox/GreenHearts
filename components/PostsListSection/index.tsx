import { SectionList } from 'react-native'

import PostCard from './PostCard'
import { PostsListDivider } from './PostsListDivider'

import { usePosts } from '@/hooks/usePosts'

export default function PostsListSection() {
  const { postsByDay, fetchMorePosts } = usePosts()

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
