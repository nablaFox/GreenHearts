import { useEffect } from 'react'

export function useActionHandler<T extends string>({
  actionStatus,
  onError,
  onSuccess,
  onLoading
}: {
  actionStatus: T
  onError?: (error: Exclude<T, 'success' | 'loading'>) => void
  onSuccess?: () => void
  onLoading?: () => void
}) {
  useEffect(() => {
    if (actionStatus === 'loading') {
      onLoading?.()
    } else if (actionStatus === 'success') {
      onSuccess?.()
    } else {
      onError?.(actionStatus as Exclude<T, 'success' | 'loading'>)
    }
  }, [actionStatus, onError, onSuccess, onLoading])
}
