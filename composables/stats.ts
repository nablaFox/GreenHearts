import { doc } from 'firebase/firestore'
import type { Stats } from '@/types' 

export function useStats() {
	const db = useFirestore()
	const stats = useState<Stats | undefined>('stats')	
	const fetched = useState<boolean>('statsFetched')	
	const posts = usePosts()

	if (!posts.total.value) {
		posts.getTotalCount()
	}

	const totalValue = computed(
		() => stats.value && Math.floor(stats.value.red * -2 + stats.value.green + stats.value.white * .1)
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.white)

	const notCounted = computed(() => total.value && (posts.total.value - total.value))

	async function fetch() {
		if (fetched.value) return

		await useDocument(doc(db, 'stats', 'base'), {
			target: stats,
		}).promise.value

		fetched.value = true
	}

	return { stats, total, notCounted, fetch, totalValue, fetched }
}
