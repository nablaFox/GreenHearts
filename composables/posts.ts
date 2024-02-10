import { collection, query, limit, orderBy, addDoc, updateDoc, increment, doc, getCountFromServer, onSnapshot, type CollectionReference } from 'firebase/firestore'
import type { Post, Vote } from '@/types'

export function usePosts() {
	const db = useFirestore()
	const lim = useState<number>('postsLimit')
	const total = useState<number>('postsTotal')
	const posts = useState<Post[]>('posts')
	const loading = useState<boolean | undefined>('createPostProgress')
	const length = computed(() => posts.value?.length)
	const { id: userId } = useUser()
	const userPostsColl = computed(() => collection(db, userId && `users/${userId.value}/posts`))

	async function getTotalCount() {
		total.value = (await getCountFromServer(userPostsColl.value)).data().count
	}

	async function fetch() {
		const _query = computed(
			() => query(userPostsColl.value, orderBy('date', 'desc'), limit(lim.value))
		)

		watch(_query, q => {
			onSnapshot(q, (snap) => {
				posts.value = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Post))
			})
		})

		await getTotalCount()	
		lim.value = 25

		let _posts = null
		while (!_posts && total.value) {
			_posts = posts.value
			await new Promise((r) => setTimeout(r, 100))
		}

		await getTotalCount()	
		lim.value = 17
	}

	async function fetchMore() {
		if (lim.value >= total.value) return	
		lim.value += 25
	}

	type CreatePostParams = {
		title: string | undefined
		notes: string | undefined
		image: File | null
	}

	async function createPost({title, notes, image}: CreatePostParams) {
		if (!title && !image) return
		loading.value = true

		const params = {
			title,
			notes,
			image: null as string | null,
			date: new Date().toString(),
		}

		if (image) {
			const { url } = await usePostsStorage().upload(image)
			if (!url) return (loading.value = false)
			params.image = url
		}

		await addDoc(userPostsColl.value, params)	

		total.value++
		loading.value = false
	}

	async function votePost(id: string, vote: Vote, negative: boolean) {
		const _score = vote.score || 1
		const update = negative ? -_score : _score

		await updateDoc(doc(db, `users/${userId.value}/posts`, id), {
			[vote.type]: increment(update)
		})

		await updateDoc(doc(db, `users/${userId.value}`), {
			[`stats.${vote.type}`]: increment(update)
		})
	}

	return {
		loading,
		fetch,
		getTotalCount,
		posts,
		lim,
		length,
		total,
		createPost,
		votePost,
		fetchMore
	}
}
