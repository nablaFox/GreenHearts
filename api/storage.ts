import { storage } from './index'
import type { FirebaseStorageError } from '@/libs/firebaseErrors'

export async function uploadPostImage(
  userId: string,
  imageUri: string,
  postName: string
) {
  try {
    const postStorageRef = storage.posts({ userId, fileName: postName })
    await postStorageRef.putFile(imageUri)
    const downloadUrl = await postStorageRef.getDownloadURL()
    return [null, downloadUrl] as const
  } catch (e: any) {
    const code = e?.code as FirebaseStorageError
    return [code, null] as const
  }
}
