import {
	collection,
	addDoc,
	updateDoc,
	increment,
	doc,
	getCountFromServer,
	query,
	orderBy,
	limit,
	Timestamp,
} from 'firebase/firestore'
import type { Post, Vote, CreatePostParams } from '@/types'

export function usePosts() {
	const db = useFirestore()
	const lim = useState<number>('postsLimit', () => 10)
	const user = useRuntimeConfig().public.privateUser // this is valid only for the private version
	const postsColl = collection(db, `users/${user}/posts`)
	const _query = computed(() => query(postsColl, orderBy('date', 'desc'), limit(lim.value)))

	const total = useState<number>('postsTotal', () => 0)
	const loading = useState<boolean | undefined>('createPostProgress')
	const posts = useCollection<Post>(_query, { ssrKey: 'posts' })

	const length = computed(() => posts.value?.length)
	const { error, setError } = makeError<boolean>('postsError')

	// TODO: create a field where we can store the total count of posts
	async function getTotalCount() {
		if (total.value) return
		total.value = (await getCountFromServer(postsColl)).data().count
	}

	async function fetchMore(num?: number) {
		!total.value && await getTotalCount()
		if (lim.value >= total.value) return
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
			const result = await usePostsStorage().upload(image)
				.catch(() => {
					loading.value = false
					setError(true)
				})

			if (!result) return
			params.image = (result as any).url
		}

		await addDoc(postsColl, params).catch(() => setError(true))
		loading.value = false
		total.value++
	}

	async function votePost(id: string, vote: Vote, negative: boolean) {
		const _score = vote.score || 1
		const update = negative ? -_score : _score

		await updateDoc(doc(db, `users/${user}/posts`, id), {
			[vote.type]: increment(update)
		}).catch(() => setError(true))

		await updateDoc(doc(db, `users/${user}`), {
			[`stats.${vote.type}`]: increment(update)
		}).catch(() => setError(true))
	}

	return {
		total,
		error,
		loading,
		posts,
		lim,
		length,
		createPost,
		votePost,
		query: _query,
		fetchMore,
		getTotalCount,
	}
}
