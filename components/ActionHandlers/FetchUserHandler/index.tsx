import { useUser } from '@/hooks/useUser'

import { LoadingUserHandler } from './LoadingUserHandler'
import { NoBunniesHandler } from './NoBunniesHandler'
import { NoBunnySetHandler } from './NoBunnySetHandler'
import { NoUserFoundHandler } from './NoUserFoundHandler'

export default function FetchUserHandler() {
  const fetchUserStatus = useUser(state => state.fetchUserStatus)

  if (fetchUserStatus === 'loading') return <LoadingUserHandler />

  if (fetchUserStatus === 'no-bunny') return <NoBunnySetHandler />

  if (fetchUserStatus === 'no-bunnies') return <NoBunniesHandler />

  if (fetchUserStatus === 'not-found') return <NoUserFoundHandler />

  if (fetchUserStatus !== 'success') {
    // some generic error handling
  }
}
