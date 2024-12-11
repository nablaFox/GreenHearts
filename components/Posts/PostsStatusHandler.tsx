import { useEffect } from 'react'

import { useSnackbar } from '@/hooks/useSnackbar'
import { usePosts } from '@/hooks/usePosts'
import { useLoaderbar } from '@/hooks/useLoaderbar'

export function PostsStatusHandler() {
  const { showSnackbar } = useSnackbar()
  const { showLoaderbar, hideLoaderbar } = useLoaderbar()
  const { fetchPostsStatus, updatePostStatus } = usePosts()

  useEffect(() => {
    if (updatePostStatus === 'error-upload') {
      showSnackbar({
        description: 'Failed to upload post'
      })
    }

    if (updatePostStatus === 'error-vote') {
      showSnackbar({
        description: 'Failed to delete post'
      })
    }

    // ... TODO: related to TEMPs in global.d.ts
  }, [updatePostStatus, showSnackbar])

  useEffect(() => {
    if (fetchPostsStatus === 'loading') showLoaderbar()
    else hideLoaderbar()
  }, [fetchPostsStatus, showLoaderbar, hideLoaderbar])

  return null
}
