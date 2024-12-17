import { Heart } from '@/types'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { Post } from '@/types'

import { PostFooter } from './PostFooter'
import { PostsListDivider } from '../PostsListDivider'

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      {post.isHeader && <PostsListDivider date={post.userDate?.toDate()} />}

      <Text>{post.title}</Text>
      <Text>{post.notes}</Text>

      <PostFooter postHeart={post.heart || Heart.Gray} postId={post.key} />
    </View>
  )
}
