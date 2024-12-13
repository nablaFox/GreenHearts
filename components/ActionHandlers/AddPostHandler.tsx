import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'

import { AddPostErrors } from '@/constants/errors'

import { ActionHandler } from './ActionHandler'

export default function AddPostHandler() {
  const { addPostStatus } = usePosts()

  const onError = (error: AddPostError) => {
    showSnackBar({ description: AddPostErrors[error] })
    return null
  }

  return <ActionHandler actionStatus={addPostStatus} onError={onError} />
}
