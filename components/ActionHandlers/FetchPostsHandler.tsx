import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useActionHandler } from '@/hooks/useActionHandler'

import { LoadingPostsSplash } from '@/components/LoadingSplashScreens'

export function FetchPostsHandler() {
  const { fetchPostsStatus } = usePosts()

  if (fetchPostsStatus === 'loading') {
    return <LoadingPostsSplash />
  }

  if (fetchPostsStatus !== 'success') {
    // some generic error handling
    return null
  }
}
