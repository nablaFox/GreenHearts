import { useUser } from '@/hooks/useUser'
import { useErrorNotifier } from '@/hooks/useErrorNotifier'

import { Loading } from './Loading'
import { NoSelectedBunny } from './NoSelectedBunny'
import { NoBunnyToChoose } from './NoBunnyToChoose'
import { UserNotFound } from './UserNotFound'

// full screen (covers sign-in)
export default function FetchUserHandler() {
  const fetchUserStatus = useUser(state => state.fetchUserStatus)

  useErrorNotifier(fetchUserStatus)

  if (fetchUserStatus === 'loading') return <Loading />

  if (fetchUserStatus === 'no-bunnies') return <NoBunnyToChoose />

  if (fetchUserStatus === 'no-bunny-set') return <NoSelectedBunny />

  if (fetchUserStatus === 'firestore/not-found') return <UserNotFound />

  return null
}
