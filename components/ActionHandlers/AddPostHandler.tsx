import { useActionHandler } from '@/hooks/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'

export function AddPostHandler() {
  const { addPostStatus } = usePosts()

  if (addPostStatus === 'loading') {
    return null
  }

  if (addPostStatus !== 'success') {
    // some generic error handling
    return null
  }
}
