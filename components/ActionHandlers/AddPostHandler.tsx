import { useActionHandler } from '@/hooks/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'

import { AddPosts_Msgs } from '@/constants/errors'

export function AddPostHandler() {
  const { addPostStatus } = usePosts()

  const onError = (error: AddPostError) => {
    showSnackBar({ description: AddPosts_Msgs[error] })
  }

  useActionHandler({
    actionStatus: addPostStatus,
    onError
  })

  return null
}
