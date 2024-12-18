import { useErrorNotifier } from '@/hooks/useErrorNotifier'
import { usePosts } from '@/hooks/usePosts'

import { Text } from 'react-native-paper'

export function FetchPostsHandler() {
  const fetchPostsStatus = usePosts(state => state.fetchPostsStatus)

  useErrorNotifier(fetchPostsStatus)

  // skeleton loading
  if (fetchPostsStatus === 'loading') return <Text>Loading posts...</Text>

  return null
}
