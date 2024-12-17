import { useUser } from '@/hooks/useUser'

import { Loading } from './Loading'
import { NoSelectedBunny } from './NoSelectedBunny'
import { NoBunnyToChoose } from './NoBunnyToChoose'
import { UserNotFound } from './UserNotFound'

export default function FetchUserHandler() {
  const fetchUserStatus = useUser(state => state.fetchUserStatus)

  if (fetchUserStatus === 'success') return null

  if (fetchUserStatus === 'loading') return <Loading />

  if (fetchUserStatus === 'no-bunnies') return <NoBunnyToChoose />

  if (fetchUserStatus === 'no-bunny-set') return <NoSelectedBunny />

  if (fetchUserStatus === 'firestore/not-found') return <UserNotFound />

  // some generic error handling
  return null
}
