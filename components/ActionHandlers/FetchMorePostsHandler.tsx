import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { useActionHandler } from '@/libs/useActionHandler'

export function FetchMorePostsHandler() {
  const fetchMorePostsStatus = usePosts(state => state.fetchMorePostsStatus)

  if (fetchMorePostsStatus === 'loading') {
    // loading state handling

    return null
  }

  if (fetchMorePostsStatus !== 'success') {
    // some generic error handling

    return null
  }
}
