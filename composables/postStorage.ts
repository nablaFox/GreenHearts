import {ref as storageRef, type StorageReference} from 'firebase/storage'

export function usePostStorage() {
	const storage = useFirebaseStorage()
	const fileRef = ref<StorageReference | null>(null)
	const {
		url,
		uploadProgress,
		uploadError,
		upload: uploadFile,
	} = useStorageFile(fileRef)

	async function upload(file: File) {
		fileRef.value = storageRef(storage, `posts/${file.name}`)
		return uploadFile(file)
	}

	return {
		upload,
		url,
		uploadProgress,
		uploadError,
		fileRef
	}
}
