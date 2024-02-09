import {ref as storageRef} from 'firebase/storage'

export async function useUploadPostImage(file: File) {
	const storage = useFirebaseStorage()
	const fileRef = storageRef(storage, `posts/${file.name}`)

	const {
		upload: uploadFile,
		url,
		uploadError,
	} = useStorageFile(fileRef)

	await uploadFile(file)

	return {
		url: url.value,
		uploadError: uploadError.value,
	}
}

