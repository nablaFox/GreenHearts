import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'
import { PostsList } from '@/components/Posts/PostsList'

import {
  FetchMorePostsHandler,
  FetchPostsHandler,
  AddPostHandler
} from '@/components/ActionHandlers'

export default function Posts() {
  return (
    <ThemedView>
      <PostsHeader />
      <PostsList />

      <FetchPostsHandler />
      <FetchMorePostsHandler />
      <AddPostHandler />
    </ThemedView>
  )
}
