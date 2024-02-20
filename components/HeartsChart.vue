<script lang="ts" setup>
import type { Point } from '~/utils/graph'

const props = defineProps<{
	data: Point[]
}>()	

const canvas = ref<HTMLCanvasElement | null>(null)

useGraph(canvas, props.data, {
	precision: 100,
	drawGraphAnimation: {
		timing: 'easeInSine',	
		duration: 0.3
	},
	changeDataAnimation: {
		timing: 'easeInSine',
		duration: 10
	},
})
</script>

<template>
  <canvas
    ref="canvas"
    class="border border-outline rounded-lg"
    width="300"
    height="150"
  />
</template>

