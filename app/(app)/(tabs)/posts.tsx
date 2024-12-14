import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'

import PostsListSection from '@/components/PostsListSection'

import {
  FetchMorePostsHandler,
  FetchPostsHandler,
  AddPostHandler
} from '@/components/ActionHandlers'

export default function Posts() {
  return (
    <ThemedView>
      <PostsHeader />
      <PostsListSection />

      <FetchPostsHandler />
      <FetchMorePostsHandler />
      <AddPostHandler />
    </ThemedView>
  )
}
