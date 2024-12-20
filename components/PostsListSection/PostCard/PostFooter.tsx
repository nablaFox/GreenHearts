import { View } from 'react-native'

import { HeartSelection } from './HeartSelection'
import { HeartButton } from './HeartButton'
import { AssignableHearts, Heart } from '@/types'

import { votePost, disVotePost } from '@/api/post'
import { useUser } from '@/hooks/useUser'

export function PostFooter({
  postHeart,
  postId
}: {
  postHeart: Heart
  postId: string
}) {
  const isOwl = useUser(state => state.user?.isOwl ?? false)
  const bunnyId = useUser(state => state.bunnyId!)

  const onSelectedHeart = async (heart: Heart) => {
    const res = await votePost(bunnyId, postId, heart)

    if (res !== 'ok') {
    }
  }

  const onDeSelectedHeart = async (heart: Heart) => {
    const res = await disVotePost(bunnyId, postId, heart)

    if (res !== 'ok') {
    }
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
