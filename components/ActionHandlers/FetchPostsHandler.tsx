import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useActionHandler } from '@/hooks/useActionHandler'

import { LoadingPostsSplash } from '@/components/LoadingSplashScreens'

export function FetchPostsHandler() {
  const { fetchPostsStatus } = usePosts()

  const onError = () => {
    // showSnackBar({ description: i18n.t('errors.fetchPosts') })
  }

  useActionHandler(fetchPostsStatus, {
    SomethingWentWrong: onError
  })

  if (fetchPostsStatus === 'loading') {
    return <LoadingPostsSplash />
  }
}
