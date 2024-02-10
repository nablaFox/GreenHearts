<script setup lang="ts">
const {
	stats,
	totalValue,
	notCounted,
	fetch
} = useStats()

type StatType = 'red' | 'green' | 'blue' | 'nc' | 'total'

await callOnce(async () => await fetch())

const statsData = computed(() => ([
	{ title: 'green', type: 'green', score: stats.value?.green },
	{ title: 'red', type: 'red', score: stats.value?.red },
	{ title: 'blue', type: 'blue', score: stats.value?.blue },
	{ title: 'not counted', type: 'nc', score: notCounted.value },
	{ title: 'total', type: 'total', score: totalValue.value }
]))
</script>

<template>
  <main class="page-size flex flex-col gap-8 max-w-[600px] pb-8">
    <GreeterBanner
      class="h-[180px]"
      head="What's up"
      title="Amore mio"
    />	

    <Teleport to="body">
      <SvgSquiggleThick class="bg-surface-variant absolute bottom-[20%] left-0" />
    </Teleport>
	
    <div class="grid grid-cols-[repeat(2,1fr)] gap-2.5">
      <StatCard
        v-for="stat in statsData"
        :key="stat.title"
        :type="stat.type as StatType"
        :score="stat.score"
        :title="stat.title"
      />
    </div>
  </main>
</template>

<style scoped>
.stat:last-child {
  grid-column: span 2;
}

svg:deep(path) {
	stroke: var(--md-sys-color-secondary);
}
</style>

