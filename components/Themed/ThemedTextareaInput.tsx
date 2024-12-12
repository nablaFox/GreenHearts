import { Icon } from 'react-native-paper'
import { TextInput, View } from 'react-native'
import { useState } from 'react'

export function ThemedTextareaInput({
  placeholder,
  value,
  onChangeText,
  icon,
  rows
}: {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  icon?: string
  rows: number
}) {
  const [height, setHeight] = useState(rows * 20)

  return (
    <View>
      <TextInput
        style={{ height }}
        multiline
        placeholder={placeholder}
        value={value}
        onContentSizeChange={event => {
          setHeight(event.nativeEvent.contentSize.height)
        }}
        onChangeText={onChangeText}
      />

      <Icon source={icon} size={24} />
    </View>
  )
}
