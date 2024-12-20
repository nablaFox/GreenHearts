import type { FirestoreError } from '@/libs/firebaseErrors'
import { firestore } from './index'
import { Heart, HeartStringMap, type ActionResult } from '@/types'

type VotePostResult = ActionResult<FirestoreError>

export async function votePost(
  bunnyId: string,
  postId: string,
  heart: Heart
): Promise<VotePostResult> {
  try {
    await firestore.post({ userId: bunnyId, postId }).update({ heart })

    await firestore.todayStats({ userId: bunnyId }).update({
      [HeartStringMap[heart]]: firestore.FieldValue.increment(1),
      score: firestore.FieldValue.increment(heart)
    })

    return 'ok'
  } catch (e: any) {
    return e?.code
  }
}

export async function disVotePost(
  bunnyId: string,
  postId: string,
  heart: Heart
): Promise<VotePostResult> {
  try {
    await firestore
      .post({ userId: bunnyId, postId })
      .update({ heart: Heart.Gray })

    firestore.todayStats({ userId: bunnyId }).update({
      [HeartStringMap[heart]]: firestore.FieldValue.increment(-1),
      score: firestore.FieldValue.increment(-heart)
    })

    return 'ok'
  } catch (e: any) {
    return e?.code
  }
}
