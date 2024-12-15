import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore'

import contract from './contract'

interface FirestoreContractEntry<
  Params extends Record<string, any>,
  DocType extends FirebaseFirestoreTypes.DocumentData
> {
  path: string
  params: Params
  docType: DocType
}

type FirestoreContract = {
  [key: string]: FirestoreContractEntry<any, any>
}

type InferParams<T extends FirestoreContractEntry<any, any>> = T['params']
type InferDocType<T extends FirestoreContractEntry<any, any>> = T['docType']

function buildPath(path: string, params: Record<string, any>) {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(`{${key}}`, params[key])
  }, path)
}

type SnapshotCallback<T extends FirebaseFirestoreTypes.DocumentData> = (
  snapshot: FirebaseFirestoreTypes.DocumentSnapshot<T>
) => void

type FirestoreClient<Contract extends FirestoreContract> = {
  [K in keyof Contract]: {
    get(
      params: InferParams<Contract[K]>
    ): Promise<
      FirebaseFirestoreTypes.DocumentSnapshot<InferDocType<Contract[K]>>
    >
    set(
      params: InferParams<Contract[K]>,
      data: InferDocType<Contract[K]>
    ): Promise<void>
    update(
      params: InferParams<Contract[K]>,
      data: Partial<InferDocType<Contract[K]>>
    ): Promise<void>
    delete(params: InferParams<Contract[K]>): Promise<void>
    onSnapshot(
      params: InferParams<Contract[K]>,
      callback: SnapshotCallback<InferDocType<Contract[K]>>
    ): () => void
  }
}

function getFirestoreClient<Contract extends FirestoreContract>(
  contract: Contract
): FirestoreClient<Contract> {
  const client = {} as FirestoreClient<Contract>

  for (const key in contract) {
    const { path } = contract[key]
    client[key] = {
      async get(params) {
        const docRef = getDocRef<InferDocType<Contract[typeof key]>>(
          path,
          params
        )
        return await docRef.get()
      },
      async set(params, data) {
        const docRef = getDocRef<InferDocType<Contract[typeof key]>>(
          path,
          params
        )
        await docRef.set(data)
      },
      async update(params, data) {
        const docRef = getDocRef<InferDocType<Contract[typeof key]>>(
          path,
          params
        )
        await docRef.update(data as Partial<InferDocType<Contract[typeof key]>>)
      },
      async delete(params) {
        const docRef = getDocRef<InferDocType<Contract[typeof key]>>(
          path,
          params
        )
        await docRef.delete()
      },
      onSnapshot(params, callback) {
        const docRef = getDocRef<InferDocType<Contract[typeof key]>>(
          path,
          params
        )
        return docRef.onSnapshot(snapshot => {
          callback(snapshot)
        })
      }
    }
  }

  return client
}

function getDocRef<T extends FirebaseFirestoreTypes.DocumentData>(
  path: string,
  params: Record<string, any>
): FirebaseFirestoreTypes.DocumentReference<T> {
  const resolvedPath = buildPath(path, params)
  return firestore().doc(
    resolvedPath
  ) as FirebaseFirestoreTypes.DocumentReference<T>
}

const client = getFirestoreClient(contract)

export default client
