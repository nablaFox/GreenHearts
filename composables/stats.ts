import type { WeekStat } from '@/types'

export function useWeekData() {
	const { data } = useUser()
	const stats = computed(() => {
		let week = data.value?.weekly
		if (!week) return null	

		const now = new Date().getDay()

		if (now < week.length && week.length > 0) {
			const last = week.at(-1)!
			week = []
			for (let i = 0; i < now; i++) 
				week.push(last)
		}

		return week.length > 1 ? week : null
	})
	
	const defaultStats: WeekStat[] = [
		{ total: 0, kcal: 0, meals: 0 },
		{ total: 8, kcal: 0, meals: 0 },
		{ total: 3, kcal: 0, meals: 0 },
		{ total: 4, kcal: 0, meals: 0 },
	]

	const thereAreStats = computed(() => stats.value !== null)

	return {
		thereAreStats,
		defaultStats,
		stats
	}
}

export function useStats() {
	const { totalPosts, data } = useUser()
	const stats = computed(() => data.value?.stats)

	const totalValue = computed(
		() => stats.value && parseFloat((stats.value.red * -2 + stats.value.green + stats.value.blue * .2).toFixed(1))
	)

	const total = computed(() => stats.value && stats.value.red + stats.value.green + stats.value.blue)

	const notCounted = computed(() => totalPosts.value - (total.value || 0))

	return { stats, total, notCounted, totalValue }
}
