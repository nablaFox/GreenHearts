export function useStats() {
	const posts = usePosts()
	const { stats } = usePrivate()

	if (!posts.total.value) {
		posts.getTotalCount()
	}

	const totalValue = computed(
		() => stats.value && (stats.value.red * -2 + stats.value.green + stats.value.blue * .2).toFixed(1)
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.blue)

	const notCounted = computed(() => total.value && (posts.total.value - total.value))

	return { stats, total, notCounted, totalValue }
}
