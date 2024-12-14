import { useUser } from '@/hooks/useUser'
import { showSnackBar } from '@/hooks/useSnackBar'

import { FetchUser_Msgs } from '@/constants/errors'

import { LoadingUserSplash } from '@/components/LoadingSplashScreens'
import { useActionHandler } from '@/hooks/useActionHandler'

export function FetchUserHandler() {
  const { fetchUserStatus } = useUser()

  const onError = (error: FetchUserError) => {
    if (error === 'no-bunny' || error === 'no-bunnies') return

    showSnackBar({ description: FetchUser_Msgs[error] })
  }

  useActionHandler({
    actionStatus: fetchUserStatus,
    onError
  })

  if (fetchUserStatus === 'loading') return <LoadingUserSplash />

  return null
}
