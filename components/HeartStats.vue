<script setup lang="ts">
const {
	stats,
	notCounted,
} = useStats()

type StatType = 'red' | 'green' | 'blue' | 'nc' | 'total'

const statsData = computed(() => ([
	{ title: 'green', type: 'green', score: stats.value?.green },
	{ title: 'red', type: 'red', score: stats.value?.red },
	{ title: 'blue', type: 'blue', score: stats.value?.blue },
	{ title: 'nc', type: 'nc', score: notCounted.value },
]))
</script>

<template>	
  <div class="grid grid-cols-2 gap-2.5">
    <StatCard
      v-for="stat in statsData"
      :key="stat.title"
      :type="stat.type as StatType"
      :score="stat.score"
      :title="stat.title"
    />
  </div>
</template>

