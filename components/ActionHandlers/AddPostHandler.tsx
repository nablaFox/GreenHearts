import { useErrorNotifier } from '@/hooks/useErrorNotifier'
import { usePosts } from '@/hooks/usePosts'

import { t } from '@lingui/core/macro'

import { LoadingBar } from '@/components/LoadingBar'

export function AddPostHandler() {
  const addPostStatus = usePosts(state => state.addPostStatus)

  useErrorNotifier(addPostStatus, {
    'firestore/invalid-argument': t`The post seems to be invalid`
  })

  if (addPostStatus === 'loading') return <LoadingBar />

  return null
}
