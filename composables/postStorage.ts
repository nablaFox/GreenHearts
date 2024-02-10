import {ref as storageRef, StorageError } from 'firebase/storage'

export function usePostsStorage() {
	const error = useState<StorageError | null | undefined>('imageUploadError')
	const progress = useState<number | null>('imageUploadProgress')
	const storage = useFirebaseStorage()

	async function upload(file: File) {
		const fileRef = storageRef(storage, `posts/${file.name}`)

		const {
			upload: uploadFile,
			url: _url,
			uploadError,
			uploadProgress,
		} = useStorageFile(fileRef)

		watch(uploadProgress, now => (progress.value = now))
		watchOnce(uploadError, () => (error.value = uploadError.value))

		await uploadFile(file)

		let url = _url.value
		while (!url && !error.value) {
			await new Promise(r => setTimeout(r, 100))
			url = _url.value
		}

		return {
			url,
			uploadError: uploadError.value,
		}
	}

	return {
		upload,
		error,
		progress,
	}
}


