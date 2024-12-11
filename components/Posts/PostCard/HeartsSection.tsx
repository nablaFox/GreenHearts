import { View } from 'react-native'

import { AdminHeartButtons } from './AdminHeartButtons'
import { HeartButton } from './HeartButton'

import { useUser } from '@/hooks/useUser'

export function HeartsSection({
  score,
  postId
}: {
  score: HeartScore
  postId: string
}) {
  const { isAdmin } = useUser()

  return (
    <View>
      {isAdmin ? (
        <AdminHeartButtons currScore={score} postId={postId} />
      ) : (
        <HeartButton score={score} constant />
      )}
    </View>
  )
}
