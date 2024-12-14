import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { Icon } from 'react-native-paper'

export function StatsCard({
  title,
  value,
  icon
}: {
  title: string
  value: number
  icon: any
}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{value}</Text>
      <Icon source={icon} size={24} />
    </View>
  )
}
