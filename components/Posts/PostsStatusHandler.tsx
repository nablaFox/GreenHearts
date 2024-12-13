import { useEffect } from 'react'

import { usePosts } from '@/hooks/usePosts'
import { showSnackbar } from '@/hooks/useSnackbar'
import { showLoaderbar } from '@/hooks/useLoaderbar'

import { FetchPostsErrors } from '@/constants/errors'

export function PostsStatusHandler() {
  const { fetchPostsStatus, fetchMorePostsStatus } = usePosts()

  useEffect(() => {
    if (fetchPostsStatus !== 'loading' && fetchPostsStatus !== 'success') {
      showSnackbar({
        description: FetchPostsErrors[fetchPostsStatus]
      })
    }

    if (fetchMorePostsStatus === 'loading') showLoaderbar()
    else if (fetchMorePostsStatus !== 'success')
      showSnackbar({
        description: FetchPostsErrors[fetchMorePostsStatus]
      })
  }, [fetchPostsStatus, fetchMorePostsStatus])

  return null
}
