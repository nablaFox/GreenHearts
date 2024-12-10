import { View } from 'react-native'

type Props = {}

// TIP: if it's too long to handle bg-transaction use intermediate CollapsibleAnimatedHeader component

export function CollapsibleHeader({
  children
}: React.PropsWithChildren<Props>) {
  return <View className="h-[100] justify-center bg-red-100">{children}</View>
}
