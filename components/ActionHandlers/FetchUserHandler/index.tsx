import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { LoadingUserSplash } from '@/components/LoadingSplashScreens'
import { useActionHandler } from '@/hooks/useActionHandler'

import { NoBunniesHandler } from './NoBunniesHandler'
import { NoBunnySetHandler } from './NoBunnySetHandler'
import { NoUserFoundHandler } from './NoUserFoundHandler'

export default function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  if (fetchUserStatus === 'loading') return <LoadingUserSplash />

  if (fetchUserStatus === 'no-bunny') return <NoBunnySetHandler />

  if (fetchUserStatus === 'no-bunnies') return <NoBunniesHandler />

  if (fetchUserStatus === 'not-found') return <NoUserFoundHandler />

  if (fetchUserStatus !== 'success') {
    // some generic error handling
  }
}
