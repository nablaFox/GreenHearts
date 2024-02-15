import {
	collection,
	query,
	orderBy,
	limit,
	Timestamp,
} from 'firebase/firestore'
import type { Post, Vote, CreatePostParams } from '@/types'

interface PostError {
	message?: string
}

export function usePosts() {
	const db = useFirestore()
	const lim = useState<number>('postsLimit', () => 10)
	const { userId, token } = useUser()
	const postsColl = collection(db, `users/${userId.value}/posts`)
	const _query = computed(() => query(postsColl, orderBy('date', 'desc'), limit(lim.value)))
	const { totalPosts, isAdmin } = useUser()

	const loading = useState<boolean | undefined>('createPostProgress')
	const posts = useCollection<Post>(_query, { ssrKey: 'posts' })

	const length = computed(() => posts.value?.length)
	const { error, setError } = makeError<PostError>('postsError')
	const { upload: uploadImage, progress: imageUploadProgress, url } = usePostsStorage(userId)

	function fetchMore(num?: number) {
		if (lim.value >= totalPosts.value) return
		lim.value += num || 15
	}

	async function createPost({ title, notes, image }: CreatePostParams) {
		if (!title && !image) return
		loading.value = true

		const params = {
			title,
			notes,
			image: null as string | null,
			date: Timestamp.now(),
		}

		if (image) {
			const err = await uploadImage(image)
	
			if (err) {
				setError({ message: 'Error uploading image' })
				loading.value = false
				return
			}

			params.image = url.value
		}

		await $fetch('/api/posts/create', {
			method: 'POST',
			body: params,
			headers: { 'Authorization': token.value }
		}).catch(() => setError({ message: 'Error creating post' }))

		loading.value = false
	}

	async function votePost(id: string, vote: Vote, negative: boolean) {
		if (!isAdmin.value) return 

		const _score = vote.score || 1
		const update = negative ? -_score : _score

		// TODO: make private user dynamic
		await $fetch(`/api/posts/${id}/update`, {
			method: 'PATCH',
			body: { 
				voteType: vote.type,
				updateValue: update,
				userId: useRuntimeConfig().public.privateUser
			},
			headers: { 'Authorization': token.value }
		}).catch(e => {
			setError({ message: e.statusMessage })
		})
	}

	return {
		error,
		loading,
		posts,
		lim,
		length,
		createPost,
		votePost,
		query: _query,
		fetchMore,
		imageUploadProgress,
	}
}
