import { ThemedView } from '@/components/ThemedView'

import { PostsHeader } from '@/components/Headers/PostsHeader'
import { PostsList } from '@/components/Posts/PostsList'

export default function Posts() {
  return (
    <ThemedView>
      <PostsHeader />
      <PostsList />
    </ThemedView>
  )
}
