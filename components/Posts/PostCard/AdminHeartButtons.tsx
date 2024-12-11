import { View } from 'react-native'

import { HeartButton } from './HeartButton'

import { usePost } from '@/hooks/usePost'
import { assignableScores } from '@/constants/common'

export function AdminHeartButtons({
  currScore,
  postId
}: {
  currScore: HeartScore
  postId: string
}) {
  const { votePost } = usePost()

  const handleVotePost = (score: HeartScore) => {
    // error handling

    if (score === currScore) {
      return votePost(0, postId)
    }

    votePost(score, postId)
  }

  return (
    <View>
      {assignableScores.map(score => (
        <HeartButton
          key={score}
          score={score === currScore ? score : 0}
          onPress={() => handleVotePost(score)}
        />
      ))}
    </View>
  )
}
