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

  return (
    <View>
      {assignableScores.map(score => (
        <HeartButton
          key={score}
          score={score}
          active={currScore === score}
          onPress={() => votePost(score, postId)}
        />
      ))}
    </View>
  )
}
