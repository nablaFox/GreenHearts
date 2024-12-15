import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchMorePostsHandler() {
  const { fetchMorePostsStatus } = usePosts()

  if (fetchMorePostsStatus === 'loading') {
    // loading state handling

    return null
  }

  if (fetchMorePostsStatus !== 'success') {
    // some generic error handling

    return null
  }
}
