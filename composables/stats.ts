export function useStats() {
	const { stats } = useUser()
	const { total: totalPosts } = usePosts()

	const totalValue = computed(
		() => stats.value && parseFloat((stats.value.red * -2 + stats.value.green + stats.value.blue * .2).toFixed(1))
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.blue)

	const notCounted = computed(() => total.value && (totalPosts.value - total.value))

	return { stats, total, notCounted, totalValue }
}
