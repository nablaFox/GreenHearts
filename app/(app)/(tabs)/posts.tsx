import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'
import { PostsList } from '@/components/Posts/PostsList'
import { PostsLoadingSplash } from '@/components/Posts/PostsLoadingSplash'

import { usePosts } from '@/hooks/usePosts'

export default function Posts() {
  const { fetchPostsStatus } = usePosts()

  return (
    <ThemedView>
      <PostsHeader />
      {fetchPostsStatus === 'loading' && <PostsLoadingSplash />}
      <PostsList />
    </ThemedView>
  )
}
