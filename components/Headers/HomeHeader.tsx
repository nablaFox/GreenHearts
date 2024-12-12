import { Text } from 'react-native-paper'
import { CollapsibleHeader } from './CollapsibleHeader'
import { Link } from 'expo-router'

export function HomeHeader() {
  return (
    <CollapsibleHeader>
      <Text>Home Header</Text>

      <Link href="/settings">settings link</Link>
    </CollapsibleHeader>
  )
}
