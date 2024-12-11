import { ThemedView } from '@/components/ThemedView'

type Props = {}

// TIP: if it's too long to handle bg-transaction use intermediate CollapsibleAnimatedHeader component

export function CollapsibleHeader({
  children
}: React.PropsWithChildren<Props>) {
  return <ThemedView className="h-[100] justify-center">{children}</ThemedView>
}
