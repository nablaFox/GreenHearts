import { ReactNode, useEffect, useState } from 'react'

export function ActionHandler<T>({
  actionStatus,
  onError,
  onSuccess,
  onLoading
}: {
  actionStatus: T
  onError?: (error: Exclude<T, 'success' | 'loading'>) => ReactNode
  onSuccess?: () => ReactNode
  onLoading?: () => ReactNode
}) {
  const [renderNode, setRenderNode] = useState<ReactNode>(null)

  useEffect(() => {
    let node: ReactNode = null

    if (actionStatus === 'loading') {
      node = onLoading ? onLoading() : null
    } else if (actionStatus === 'success') {
      node = onSuccess ? onSuccess() : null
    } else {
      node = onError
        ? onError(actionStatus as Exclude<T, 'success' | 'loading'>)
        : null
    }

    setRenderNode(node)
  }, [actionStatus, onError, onSuccess, onLoading])

  return renderNode
}

