import { View } from 'react-native'

import { OwlHeartButtons } from './OwlHeartButtons'
import { HeartButton } from './HeartButton'

import { useUser } from '@/hooks/useUser'

export function HeartsSection({
  score,
  postId
}: {
  score: HeartScore
  postId: string
}) {
  const { isOwl } = useUser()

  return (
    <View>
      {isOwl ? (
        <OwlHeartButtons currScore={score} postId={postId} />
      ) : (
        score !== 0 && <HeartButton score={score} disabled />
      )}
    </View>
  )
}
