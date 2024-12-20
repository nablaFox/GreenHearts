import type { FirestoreError } from '@/libs/firebaseErrors'
import type { ActionResult, UserInDatabase } from '@/types'
import { firestore } from './clients/firestore'

type AddUserParams = {
  username: string
  isOwl: boolean
}

export async function addUser(
  params: AddUserParams,
  userId: string
): Promise<ActionResult<FirestoreError>> {
  const toAdd: UserInDatabase = {
    username: params.username,
    isOwl: params.isOwl
  }

  if (params.isOwl) {
    toAdd.bunnies = []
  }

  try {
    await firestore.user({ userId }).set(toAdd)
  } catch (e: any) {
    const code = e?.code as FirestoreError
    if (code) return code
  }

  return 'ok'
}

export async function deleteUser(
  userId: string
): Promise<ActionResult<FirestoreError>> {
  try {
    await firestore.user({ userId }).delete()
  } catch (e: any) {
    const code = e?.code as FirestoreError
    if (code) return code
  }

  return 'ok'
}
