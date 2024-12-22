import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'

import PostsListSection from '@/components/PostsListSection'

import { AddPostLoading } from '@/components/ActionHandlers'
import { usePosts } from '@/hooks/usePosts'

export default function Posts() {
  const addPostStatus = usePosts(state => state.addPostStatus)

  return (
    <ThemedView>
      <PostsHeader />
      <PostsListSection />

      {addPostStatus === 'loading' && <AddPostLoading />}
    </ThemedView>
  )
}
