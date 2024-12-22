import type { FirestoreError } from '@/libs/firebaseErrors'
import { firestore } from './index'
import { Heart, HeartStringMap, type ActionResult } from '@/types'

export async function votePost(
  userId: string,
  postId: string,
  heart: Heart
): Promise<ActionResult<FirestoreError>> {
  try {
    await firestore.post({ userId: userId, postId }).update({ heart })

    await firestore.todayStats({ userId: userId }).update({
      [HeartStringMap[heart]]: firestore.FieldValue.increment(1),
      score: firestore.FieldValue.increment(heart)
    })

    return 'ok'
  } catch (e: any) {
    return e?.code
  }
}

export async function disVotePost(
  userId: string,
  postId: string,
  heart: Heart
): Promise<ActionResult<FirestoreError>> {
  try {
    await firestore.post({ userId, postId }).update({ heart: Heart.Gray })

    firestore.todayStats({ userId: userId }).update({
      [HeartStringMap[heart]]: firestore.FieldValue.increment(-1),
      score: firestore.FieldValue.increment(-heart)
    })

    return 'ok'
  } catch (e: any) {
    return e?.code
  }
}
