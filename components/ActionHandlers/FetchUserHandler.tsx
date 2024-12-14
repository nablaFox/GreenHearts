import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { FetchUserErrors } from '@/constants/errors'

import { LoadingUserSplash } from '@/components/LoadingSplashScreens'
import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  const onError = (error: FetchUserError) => {
    switch (error) {
      case 'first-time-user':
        break
      default:
        showSnackBar({ description: FetchUserErrors[error] })
        break
    }
  }

  useActionHandler({
    actionStatus: fetchUserStatus,
    onError
  })

  if (fetchUserStatus === 'loading') return <LoadingUserSplash />

  return null
}
