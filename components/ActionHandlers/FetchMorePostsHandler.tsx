import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { showLoadingBar } from '@/hooks/useLoadingBar'

import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchMorePostsHandler() {
  const { fetchMorePostsStatus } = usePosts()

  const onError = () => {
    showSnackBar({ description: 'failed to fetch posts' })
  }

  const onLoading = () => {
    showLoadingBar()
  }

  useActionHandler(fetchMorePostsStatus, {
    SomethingWentWrong: onError,
    loading: onLoading
  })

  return null
}
