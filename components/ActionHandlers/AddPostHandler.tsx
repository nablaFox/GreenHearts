import { useActionHandler } from '@/libs/useActionHandler'
import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useEffect } from 'react'

import { Text } from 'react-native-paper'

export function AddPostHandler() {
  const addPostStatus = usePosts(state => state.addPostStatus)

  if (addPostStatus === 'success') {
    return null
  }

  if (addPostStatus === 'loading') {
    return null
  }

  // some generic error handling
  return <Text>Some error has happened {addPostStatus}</Text>
}
