import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'
import { PostsList } from '@/components/Posts/PostsList'
import { PostsStatusHandler } from '@/components/Posts/PostsStatusHandler'

export default function Posts() {
  return (
    <ThemedView>
      <PostsHeader />
      <PostsList />
      <PostsStatusHandler />
    </ThemedView>
  )
}
