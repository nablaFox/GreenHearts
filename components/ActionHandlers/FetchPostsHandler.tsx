import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'

import { FetchPostsErrors } from '@/constants/errors'

import { ActionHandler } from './ActionHandler'
import { LoadingPostsSplash } from '@/components/LoadingSplashScreens'

export default function FetchPostsHandler() {
  const { fetchPostsStatus } = usePosts()

  const onError = (error: FetchPostsError) => {
    showSnackBar({ description: FetchPostsErrors[error] })
    return null
  }

  return (
    <ActionHandler
      actionStatus={fetchPostsStatus}
      onError={onError}
      onLoading={() => <LoadingPostsSplash />}
    />
  )
}
