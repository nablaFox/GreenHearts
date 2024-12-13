import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { FetchPostsErrors } from '@/constants/errors'

import { ActionHandler } from './ActionHandler'

export default function FetchMorePostsHandler() {
  const { fetchMorePostsStatus } = usePosts()

  const onError = (error: FetchPostsError) => {
    showSnackBar({ description: FetchPostsErrors[error] })
    return null
  }

  const onLoading = () => {
    showLoadingBar()
    return null
  }

  return (
    <ActionHandler
      actionStatus={fetchMorePostsStatus}
      onError={onError}
      onLoading={onLoading}
    />
  )
}
