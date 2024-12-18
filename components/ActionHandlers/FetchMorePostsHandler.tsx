import { usePosts } from '@/hooks/usePosts'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

import { LoadingBar } from '@/components/LoadingBar'

export function FetchMorePostsHandler() {
  const fetchMorePostsStatus = usePosts(state => state.fetchMorePostsStatus)

  useErrorNotifier(fetchMorePostsStatus)

  // skeleton loading
  if (fetchMorePostsStatus === 'loading') return <LoadingBar />

  return null
}
