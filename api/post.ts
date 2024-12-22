import type { FirestoreError } from '@/libs/firebaseErrors'
import { firestore } from './index'
import { Heart, type ActionResult } from '@/types'

export async function votePost(
  userId: string,
  postId: string,
  heart: Heart
): Promise<ActionResult<FirestoreError>> {
  try {
    await firestore.post({ userId: userId, postId }).update({ heart })
    return 'ok'
  } catch (e: any) {
    return (e?.code || e) as FirestoreError
  }
}

export async function disVotePost(
  userId: string,
  postId: string,
  heart: Heart
): Promise<ActionResult<FirestoreError>> {
  try {
    await firestore.post({ userId, postId }).update({ heart: Heart.Gray })
    return 'ok'
  } catch (e: any) {
    return (e?.code || e) as FirestoreError
  }
}
