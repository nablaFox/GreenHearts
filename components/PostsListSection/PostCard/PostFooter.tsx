import { View } from 'react-native'

import { HeartSelection } from './HeartSelection'
import { HeartButton } from './HeartButton'

import { useUser } from '@/hooks/useUser'
import { usePosts } from '@/hooks/usePosts'

export function PostFooter({
  postHeart,
  postId
}: {
  postHeart: Heart
  postId: string
}) {
  const { isOwl } = useUser()
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
