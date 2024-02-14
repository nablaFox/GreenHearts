import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export function usePostsStorage() {
	const storage = useFirebaseStorage()
	const progress = useState<number>('postImageUploadProgress', () => 0)
	const url = ref<string | null>('')

	async function upload(file: File) {	
		const fileRef = storageRef(storage, file.name)
		const imageRef = storageRef(storage, `posts/${file.name}`)
		let error = false

		fileRef.name === imageRef.name
		fileRef.fullPath === imageRef.fullPath

		const uploadTask = uploadBytesResumable(imageRef, file)

		let _url = null
		uploadTask.on('state_changed', (snapshot) => {
			progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
		}, () => (error = true), 
		() => getDownloadURL(uploadTask.snapshot.ref)
			.then(downloadURL => (_url = downloadURL))
		)

		while (!_url && !error)
			await new Promise((r) => setTimeout(r, 100))

		progress.value = 0
		url.value = _url

		return error
	}

	return {
		url,
		upload,
		progress,
	}
}

