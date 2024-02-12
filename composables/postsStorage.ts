import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export function usePostsStorage() {
	const storage = useFirebaseStorage()
	const progress = useState<number>('postImageUploadProgress', () => 0)

	async function upload(file: File) {	
		const { setError, error } = makeError<boolean>('postsStorageError')
		const fileRef = storageRef(storage, file.name)
		const imageRef = storageRef(storage, `posts/${file.name}`)

		fileRef.name === imageRef.name
		fileRef.fullPath === imageRef.fullPath

		const uploadTask = uploadBytesResumable(imageRef, file)

		let _url = null
		uploadTask.on('state_changed', (snapshot) => {
			progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		}, () => setError(true), 
		() => getDownloadURL(uploadTask.snapshot.ref)
			.then(downloadURL => (_url = downloadURL))
		)

		while (!_url && !error.value)
			await new Promise((r) => setTimeout(r, 100))

		progress.value = 0

		return {
			url: _url,
			uploadError: error
		}
	}

	return {
		upload,
		progress,
	}
}

