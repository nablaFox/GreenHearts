import { View, type ViewProps } from 'react-native'

import { useTheme } from 'react-native-paper'

export function ThemedView(props: ViewProps) {
  const backgroundColor = useTheme().colors.background

  return <View style={[{ backgroundColor }, props.style]} {...props} />
}
