<script lang="ts" setup>
// const testData = ref(new Array(7).fill(0).map((_, i) => ({ x: i, y: Math.random() * 10 })))

const testData = ref([
	{ x: 0, y: 1 },
	{ x: 1, y: 3 },
	{ x: 2, y: 3 },
])

function addData() {
	testData.value.push({ x: testData.value.length, y: Math.random() * 10 })
}

function modifyData() {
	const index = Math.floor(Math.random() * testData.value.length)
	testData.value[index].y = Math.random() * 10
}
</script>

<template>
  <div class="h-[100vh] flex-center w-full">
    <HeartsChart
      :data="testData"
      class="border border-outline rounded-xl"
    />
  </div>
</template>

