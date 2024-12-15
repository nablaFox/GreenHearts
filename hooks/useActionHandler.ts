type StatusCallbackMap<T extends string> = Partial<Record<T, () => void>>

export function useActionHandler<T extends string>(
  status: T,
  callbacks: StatusCallbackMap<T>
): void {
  const callback = callbacks[status]
  if (callback) {
    callback()
  }
}

