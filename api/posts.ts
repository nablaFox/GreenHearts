import type {
  FirestoreError,
  FirebaseStorageError
} from '@/libs/firebaseErrors'
import type { ActionResult, Post } from '@/types'
import { uploadPostImage } from './storage'
import { firestore } from './index'

interface CreatePostParams {
  title?: string
  notes?: string
  imageUri?: string
  date?: Date
}

type AddPostError = FirestoreError | FirebaseStorageError | 'invalid-filename'

// TODO: use cloud function to update today stats
export async function addPost(
  userId: string,
  params: CreatePostParams
): Promise<ActionResult<AddPostError>> {
  const toAdd: any = {
    title: params.title,
    notes: params.notes,
    date: firestore.Timestamp.now(),
    userDate: firestore.Timestamp.fromDate(params.date || new Date())
  }

  try {
    if (params.imageUri) {
      const postName = params.imageUri.split('/').pop()

      if (!postName) throw 'invalid-filename'

      const [uploadError, downloadUrl] = await uploadPostImage(
        userId,
        params.imageUri,
        postName
      )

      if (uploadError) throw uploadError

      toAdd.image = downloadUrl
    }

    await firestore.posts({ userId }).add(toAdd)

    return 'ok'
  } catch (e: any) {
    return (e?.code || e) as AddPostError
  }
}

export function setPostsListener({
  userId,
  limit,
  asc = false,
  callback,
  onError
}: {
  userId: string
  limit: number
  asc?: boolean
  callback: (posts: Post[]) => void
  onError: (error: FirestoreError) => void
}) {
  return firestore
    .posts({ userId })
    .orderBy('userDate', asc ? 'asc' : 'desc')
    .limit(limit)
    .onSnapshot(
      snapshot => {
        let lastDate = new Date()

        const posts: Post[] = snapshot.docs.map(doc => {
          const data = doc.data()
          const userDate = data.userDate?.toDate()
          const isHeader = userDate && lastDate.getDate() !== userDate.getDate()

          if (isHeader) lastDate = userDate

          return { ...data, key: doc.id, isHeader }
        })

        callback(posts)
      },
      (e: any) => {
        const code = e?.code as FirestoreError | undefined
        if (code) onError(code)
      }
    )
}
