import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { HeartsSection } from './HeartsSection'

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.notes}</Text>

      <HeartsSection score={post.score || 0} postId={post.key} />
    </View>
  )
}
