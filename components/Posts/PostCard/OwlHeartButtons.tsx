import { View } from 'react-native'

import { HeartButton } from './HeartButton'

import { usePosts } from '@/hooks/usePosts'
import { assignableScores } from '@/constants/scores'

export function OwlHeartButtons({
  currScore,
  postId
}: {
  currScore: HeartScore
  postId: string
}) {
  const { votePost } = usePosts()

  const handleVotePost = (score: HeartScore) => {
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
