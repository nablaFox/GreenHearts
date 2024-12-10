import { View, Text } from 'react-native'

import { Icon, type IconName } from '@/components/ui'

export function StatsCard({
  title,
  value,
  icon
}: {
  title: string
  value: number
  icon: IconName
}) {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{value}</Text>
      <Icon name={icon} />
    </View>
  )
}
