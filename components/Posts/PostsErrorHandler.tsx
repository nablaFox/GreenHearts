import { usePosts } from '@/hooks/usePosts'
import { showSnackbar } from '@/hooks/useSnackbar'
import { showLoaderbar } from '@/hooks/useLoaderbar'

import { FetchPostsErrors } from '@/constants/errors'

export function PostsErrorHandler() {
  const { fetchPostsStatus, fetchMorePostsStatus } = usePosts()

  if (fetchPostsStatus !== 'loading' && fetchPostsStatus !== 'success')
    showSnackbar({
      description: FetchPostsErrors[fetchPostsStatus]
    })

  if (fetchMorePostsStatus === 'loading') showLoaderbar()

  return null
}
