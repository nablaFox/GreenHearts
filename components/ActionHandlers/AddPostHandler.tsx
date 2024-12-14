import { useActionHandler } from '@/hooks/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'

import { AddPostErrors } from '@/constants/errors'

export function AddPostHandler() {
  const { addPostStatus } = usePosts()

  const onError = (error: AddPostError) => {
    showSnackBar({ description: AddPostErrors[error] })
    return null
  }

  useActionHandler({
    actionStatus: addPostStatus,
    onError
  })

  return null
}
