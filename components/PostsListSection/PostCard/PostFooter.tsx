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
  const votePost = usePosts(state => state.votePost)
  const disVotePost = usePosts(state => state.disVotePost)

  const onSelectedHeart = (heart: Heart) => {
    votePost(heart, postId)
  }

  const onDeSelectedHeart = (heart: Heart) => {
    disVotePost(heart, postId)
  }

  return (
    <View>
      {isOwl ? (
        <HeartSelection
          assignableHearts={AssignableHearts}
          activeHeart={postHeart}
          onSelectedHeart={onSelectedHeart}
          onDeSelectedHeart={onDeSelectedHeart}
        />
      ) : (
        postHeart !== Heart.Gray && <HeartButton heart={postHeart} disabled />
      )}
    </View>
  )
}
