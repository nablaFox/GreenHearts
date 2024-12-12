import { View, TextInput } from 'react-native'
import { Icon } from 'react-native-paper'

export function ThemedTextInput({
  placeholder,
  value,
  onChangeText,
  icon
}: {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  icon?: string
}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <Icon source={icon} size={24} />
    </View>
  )
}
