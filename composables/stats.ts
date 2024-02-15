export function useStats() {
	const { stats, totalPosts } = useUser()

	const totalValue = computed(
		() => stats.value && parseFloat((stats.value.red * -2 + stats.value.green + stats.value.blue * .2).toFixed(1))
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.blue)

	const notCounted = computed(() => totalPosts.value - (total.value || 0))

	return { stats, total, notCounted, totalValue }
}
