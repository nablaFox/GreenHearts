import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

export type IconName = React.ComponentProps<typeof MaterialIcons>['name']

export default function Icon({
  name,
  size = 24,
  color,
  style
}: {
  name: IconName
  size?: number
  color?: string
  style?: any
}) {
  return <MaterialIcons name={name} size={size} color={color} style={style} />
}
