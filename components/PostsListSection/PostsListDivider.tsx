import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { format } from 'date-fns'

import { WavyDivider } from '@/components/WavyDivider'

export function PostsListDivider({ date }: { date?: Date }) {
  return (
    <View>
      <Text>{format(date || new Date(), 'd MMMM')}</Text>
      <WavyDivider />
    </View>
  )
}
