import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { FetchPosts_Msgs } from '@/constants/errors'
import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchMorePostsHandler() {
  const { fetchMorePostsStatus } = usePosts()

  const onError = (error: FetchPostsError) => {
    showSnackBar({ description: FetchPosts_Msgs[error] })
  }

  const onLoading = () => {
    showLoadingBar()
  }

  useActionHandler({
    actionStatus: fetchMorePostsStatus,
    onError,
    onLoading
  })

  return null
}
