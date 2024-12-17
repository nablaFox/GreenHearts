import { Image } from 'expo-image'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { type Post, Heart } from '@/types'

import { PostFooter } from './PostFooter'
import { PostsListDivider } from '../PostsListDivider'

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      {post.isHeader && <PostsListDivider date={post.userDate?.toDate()} />}

      <Text>{post.title}</Text>
      <Text>{post.notes}</Text>

      <Image source={{ uri: post.image }} style={{ width: 100, height: 100 }} />

      <PostFooter postHeart={post.heart || Heart.Gray} postId={post.key} />
    </View>
  )
}
