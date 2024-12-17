import storage from '@react-native-firebase/storage'
import type { FirebaseStorageTypes } from '@react-native-firebase/storage'

type StorageContractField = {
  path: string | (() => string)
  params: Record<string, string | number>
}

type ExtractParams<T> = T extends { params: infer P } ? P : never

export type StorageContractType = Record<string, StorageContractField>

function getResolvedPath(
  path: string | (() => string),
  params: Record<string, string | number>
) {
  const toResolve = typeof path === 'function' ? path() : path

  return toResolve.replace(/{(.*?)}/g, (_, key) => {
    if (key in params) {
      return String(params[key])
    }

    throw new Error(`Missing value for parameter: ${key}`)
  })
}

export function createStorageClient<
  T extends StorageContractType,
  K extends keyof T
>(contract: T) {
  const client = {} as Record<
    keyof T,
    (params: ExtractParams<T[K]>) => FirebaseStorageTypes.Reference
  >

  for (const key in contract) {
    client[key] = (params: ExtractParams<T[K]>) => {
      const resolvedPath = getResolvedPath(contract[key].path, params)
      return storage().ref(resolvedPath)
    }
  }

  return client
}
