import { useActionHandler } from '@/hooks/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'

export function AddPostHandler() {
  const { addPostStatus } = usePosts()

  const onError = () => {
    // showSnackBar({ description: i18n.t('errors.AddPostError') })
  }

  useActionHandler(addPostStatus, {
    SomethingWentWrong: onError
  })

  return null
}
