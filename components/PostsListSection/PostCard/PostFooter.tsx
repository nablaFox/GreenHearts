import { View } from 'react-native'

import { HeartSelection } from './HeartSelection'
import { HeartButton } from './HeartButton'
import { AssignableHearts, Heart } from '@/types'

import { votePost, disVotePost } from '@/api/post'
import { useUser } from '@/hooks/useUser'
import { useSnackBar } from '@/hooks/useSnackBar'
import { t } from '@lingui/core/macro'

export function PostFooter({
  postHeart,
  postId
}: {
  postHeart: Heart
  postId: string
}) {
  const isOwl = useUser(state => state.user?.isOwl ?? false)
  const bunnyId = useUser(state => state.bunnyId!)
  const addKnownError = useSnackBar(state => state.addKnownError)

  const onSelectedHeart = async (heart: Heart) => {
    const res = await votePost(bunnyId, postId, heart)

    if (res !== 'ok') addKnownError({ description: res }, t`voting post`)
  }

  const onDeSelectedHeart = async (heart: Heart) => {
    const res = await disVotePost(bunnyId, postId, heart)

    if (res !== 'ok') addKnownError({ description: res }, t`disvoting post`)
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
