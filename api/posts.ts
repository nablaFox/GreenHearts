import type {
  FirestoreError,
  FirebaseStorageError
} from '@/libs/firebaseErrors'
import type { ActionResult, Post } from '@/types'
import { firestore, storage } from './index'

interface CreatePostParams {
  title?: string
  notes?: string
  imageUri?: string
  date?: Date
}

type AddPostError = FirestoreError | FirebaseStorageError | 'invalid-filename'

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
      const fileName = params.imageUri.split('/').pop()

      if (!fileName) throw 'invalid-filename'

      const postStorageRef = storage.posts({ userId, fileName })

      await postStorageRef.putFile(params.imageUri)

      const downloadUrl = await postStorageRef.getDownloadURL()

      toAdd.image = downloadUrl
    }

    await firestore.posts({ userId }).add(toAdd)

    return 'ok'
  } catch (e: any) {
    return (e?.code || e) as AddPostError
  }
}

export function fetchPosts({
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
    .orderBy('date', asc ? 'asc' : 'desc')
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
