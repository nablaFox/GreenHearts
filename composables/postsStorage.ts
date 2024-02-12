import { ref as storageRef } from 'firebase/storage'

export function usePostsStorage() {
	const { setError, error } = makeError<boolean>('postsStorageError')
	const progress = ref<number | null>()
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
		watchOnce(uploadError, () => {
			setError(true)
			progress.value = null
		})

		await uploadFile(file)

		let url = _url.value
		while (!url && !error.value) {
			await new Promise(r => setTimeout(r, 100))
			url = _url.value
		}

		progress.value = null

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


