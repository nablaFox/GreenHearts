import { useActionHandler } from '@/libs/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'

export function AddPostHandler() {
  const addPostStatus = usePosts(state => state.addPostStatus)

  if (addPostStatus === 'loading') {
    return null
  }

  if (addPostStatus !== 'success') {
    // some generic error handling
    return null
  }
}
