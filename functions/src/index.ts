import {
  onDocumentUpdated,
  onDocumentCreated
} from 'firebase-functions/v2/firestore'
import { FieldValue } from 'firebase-admin/firestore'
import * as admin from 'firebase-admin'

admin.initializeApp()

function getStatsDocId(date: Date) {
  return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
}

// TODO: find a way to reuse the definition in types
enum Heart {
  Green = 1,
  Blue = 0.25,
  Red = -1,
  Gray = 0
}

const HeartStringMap = {
  [Heart.Red]: 'reds',
  [Heart.Green]: 'greens',
  [Heart.Blue]: 'blue',
  [Heart.Gray]: 'grays'
} as any

// TODO: find a way to use PostInDatabase type
export const onPostUpdate = onDocumentUpdated(
  'users/{userId}/posts/{postId}',
  async event => {
    const before = event.data?.before.data()
    const after = event.data?.after.data()

    if (!before || !after) return

    if (before.heart === after.heart) return

    const { userId } = event.params

    const postDate = after.userDate.toDate()

    const statsDoc = `${postDate.getFullYear()}${postDate.getMonth() + 1}${postDate.getDate()}`

    const isVote = after.heart !== Heart.Gray

    const heartType = HeartStringMap[isVote ? after.heart : before.heart]

    await admin
      .firestore()
      .doc(`users/${userId}/stats/${statsDoc}`)
      .update({
        [heartType]: FieldValue.increment(isVote ? 1 : -1),
        score: FieldValue.increment(isVote ? after.heart : -before.heart)
      })
  }
)

export const onPostCreate = onDocumentCreated(
  `users/{userId}/posts/{postId}`,
  async event => {
    const { userId } = event.params
    const post = event.data?.data()

    if (!post) return

    const postDate = post.userDate.toDate()

    await admin
      .firestore()
      .doc(`users/${userId}/stats/${getStatsDocId(postDate)}`)
      .update({
        grays: FieldValue.increment(1),
        score: FieldValue.increment(Heart.Gray)
      })
  }
)
