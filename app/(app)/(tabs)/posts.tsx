import { ThemedView } from '@/components/Themed'

import { PostsHeader } from '@/components/Headers/PostsHeader'

import PostsListSection from '@/components/PostsListSection'

import { AddPostLoading } from '@/components/ActionHandlers'
import { usePosts } from '@/hooks/usePosts'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'
import { t } from '@lingui/core/macro'

export default function Posts() {
  const addPostStatus = usePosts(state => state.addPostStatus)

  useErrorNotifier(addPostStatus, { origin: t`adding post` })

  return (
    <ThemedView>
      <PostsHeader />
      <PostsListSection />

      {addPostStatus === 'loading' && <AddPostLoading />}
    </ThemedView>
  )
}
