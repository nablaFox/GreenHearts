<script setup lang="ts">
const {
	stats,
	totalValue,
	notCounted
} = useStats()

const statsData = computed(() => ([
	{ title: 'red', type: 'red', score: stats.value?.red },
	{ title: 'green', type: 'green', score: stats.value?.green },
	{ title: 'white', type: 'white', score: stats.value?.white },
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
		
    <div class="grid grid-cols-[repeat(2,1fr)] gap-2.5">
      <StatCard
        v-for="stat in statsData"
        v-bind="stat"
        :key="stat.title"
      />
    </div>
  </main>
</template>

<style scoped>
.stat:last-child {
  grid-column: span 2;
}
</style>

