import { firestore } from './index'
import type { UserInDatabase } from '@/types'
import type { FirestoreError } from '@/libs/firebaseErrors'

type GetUserResult = [FirestoreError | null, UserInDatabase | null]

export async function getUser(userId: string): Promise<GetUserResult> {
  try {
    const userDoc = await firestore.user({ userId }).get()

    // QUESTION: maybe firestore will throw this for us
    if (!userDoc.exists) throw 'firestore/not-found'

    return [null, userDoc.data() as UserInDatabase]
  } catch (e: any) {
    const code = (e?.code || e) as FirestoreError
    return [code, null]
  }
}

export function setUserCallback({
  userId,
  callback,
  onError
}: {
  userId: string
  callback: (user: UserInDatabase) => void
  onError: (error: FirestoreError) => void
}) {
  return firestore.user({ userId }).onSnapshot(
    doc => {
      const user = doc?.data()
      if (user) callback(user)
    },
    (e: any) => {
      const code = e?.code as FirestoreError
      if (code) onError(code)
    }
  )
}
