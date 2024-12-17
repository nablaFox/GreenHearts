import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import firestore from '@react-native-firebase/firestore'

type ExtractParams<T> = T extends { params: infer P } ? P : never
type ExtractDocType<T> = T extends { docType: infer D } ? D : never

type FirestoreContractField = {
  path: string | (() => string)
  params: Record<string, string | number>
  docType: Record<string, any>
}

export type FirestoreContractType = Record<string, FirestoreContractField>

function getResolvedSegments(
  path: string | (() => string),
  params: Record<string, string | number>
): string[] {
  const toResolve = typeof path === 'function' ? path() : path

  const resolvedPath = toResolve.replace(/{(.*?)}/g, (_, key) => {
    if (key in params) {
      return String(params[key])
    }

    throw new Error(`Missing value for parameter: ${key}`)
  })

  return resolvedPath.split('/').filter(segment => segment.length > 0)
}

function getRef<T extends FirebaseFirestoreTypes.DocumentData>(
  segments: string[]
) {
  let ref:
    | FirebaseFirestoreTypes.CollectionReference<T>
    | FirebaseFirestoreTypes.DocumentReference<T> = firestore().collection(
    segments[0]
  )

  for (let i = 1; i < segments.length; i++) {
    if (i % 2 === 0) {
      // @ts-ignore
      ref = (ref as FirebaseFirestoreTypes.CollectionReference<T>).collection(
        segments[i]
      )
    } else {
      // @ts-ignore
      ref = (ref as FirebaseFirestoreTypes.DocumentReference<T>).doc(
        segments[i]
      )
    }
  }

  return ref
}

export function createFirestoreRef<
  T extends FirestoreContractType,
  K extends keyof T,
  IsDoc extends boolean
>(contract: T, key: K, isDoc: IsDoc) {
  return (params: ExtractParams<T[K]>) => {
    const segments = getResolvedSegments(contract[key].path, params)

    type DocType = ExtractDocType<T[K]>

    type ReturnType = IsDoc extends true
      ? FirebaseFirestoreTypes.DocumentReference<DocType>
      : FirebaseFirestoreTypes.CollectionReference<DocType>

    return getRef<DocType>(segments) as ReturnType
  }
}
