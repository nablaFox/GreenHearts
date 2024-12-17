import { usePosts } from '@/hooks/usePosts'
import { showSnackBar } from '@/hooks/useSnackBar'
import { useActionHandler } from '@/libs/useActionHandler'

import { Text } from 'react-native-paper'

export function FetchPostsHandler() {
  const fetchPostsStatus = usePosts(state => state.fetchPostsStatus)

  if (fetchPostsStatus === 'loading') {
    return <Text>Loading posts...</Text>
  }

  if (fetchPostsStatus !== 'success') {
    // some generic error handling
    return null
  }
}
