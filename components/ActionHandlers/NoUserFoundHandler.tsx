import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { LoadingUserSplash } from '@/components/LoadingSplashScreens'
import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  // if (fetchUserStatus !== 'no-user-found') return

  return null
}
