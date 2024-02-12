<script setup lang="ts">
// TODO: change the layout based on the screen size
definePageMeta({
	layout: 'mobile'
})

const {
	stats,
	totalValue,
	notCounted,
} = useStats()

type StatType = 'red' | 'green' | 'blue' | 'nc' | 'total'

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

    <!-- <SvgSquiggleThick class="bg-surface-variant absolute top-10 right-0 rotate-90" /> -->
	
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
