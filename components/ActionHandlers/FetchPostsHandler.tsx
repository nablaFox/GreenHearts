import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useActionHandler } from '@/hooks/useActionHandler'

import { FetchPostsErrors } from '@/constants/errors'

import { LoadingPostsSplash } from '@/components/LoadingSplashScreens'

export function FetchPostsHandler() {
  const { fetchPostsStatus } = usePosts()

  const onError = (error: FetchPostsError) => {
    showSnackBar({ description: FetchPostsErrors[error] })
  }

  useActionHandler({
    actionStatus: fetchPostsStatus,
    onError
  })

  if (fetchPostsStatus === 'success') return null

  if (fetchPostsStatus === 'loading') {
    return <LoadingPostsSplash />
  }
}
