import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { useActionHandler } from '@/libs/useActionHandler'

export function FetchMorePostsHandler() {
  const fetchMorePostsStatus = usePosts(state => state.fetchMorePostsStatus)

  if (fetchMorePostsStatus === 'success') {
    return null
  }

  if (fetchMorePostsStatus === 'loading') {
    // loading state handling

    return null
  }

  // some generic error handling
  return null
}
