import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { LoadingUserSplash } from '@/components/LoadingSplashScreens'
import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  const onError = () => {
    showSnackBar({ description: 'Failed to fetch user' })
  }

  useActionHandler(fetchUserStatus, {
    SomethingWentWrong: onError
  })

  if (fetchUserStatus === 'loading') return <LoadingUserSplash />

  return null
}
