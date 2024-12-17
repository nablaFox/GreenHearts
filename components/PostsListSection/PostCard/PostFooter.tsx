import { View } from 'react-native'

import { HeartSelection } from './HeartSelection'
import { HeartButton } from './HeartButton'
import { AssignableHearts, Heart } from '@/types'

import { usePosts } from '@/hooks/usePosts'
import { useUser } from '@/hooks/useUser'

export function PostFooter({
  postHeart,
  postId
}: {
  postHeart: Heart
  postId: string
}) {
  const isOwl = useUser(state => state.user?.isOwl ?? false)
  const { votePost } = usePosts()

  const handleVotePost = (heart: Heart) => {
    if (heart === postHeart) {
      return votePost(Heart.Gray, postId)
    }

    votePost(heart, postId)
  }

  return (
    <View>
      {isOwl ? (
        <HeartSelection
          assignableHearts={AssignableHearts}
          activeHeart={postHeart}
          onSelectedHeart={handleVotePost}
        />
      ) : (
        postHeart !== Heart.Gray && <HeartButton heart={postHeart} disabled />
      )}
    </View>
  )
}
