import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { PostFooter } from './PostFooter'

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.notes}</Text>

      <PostFooter postHeart={post.heart || Heart.Gray} postId={post.key} />
    </View>
  )
}
