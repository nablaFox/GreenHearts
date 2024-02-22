<script lang="ts" setup>
import type { Point, GraphStyle } from '~/utils/graph'

const props = defineProps<{
	data: Point[]
}>()	

const canvas = ref<HTMLCanvasElement | null>(null)

const graphStyle: GraphStyle = {
	curveColor: 'black',
	// selectedLineColor: 'white',
	selectedLineDash: [8],
	mainHLineDash: [5],
	mainHLineColor: '#565657',
	curveFill: 'rgba(191, 108, 224, 1)',
	pointStroke: 'white',
	pointColor: '#9546e3',
}

const { selectedData, selectedPoint } = useGraph(canvas, props.data, {
	precision: 100,
	totalYLabels: 7,
	yAxisPrecision: 1,
	mainHorizontalLines: false,
	mainVerticalLines: false,
	showYAxis: false,
	showYLabels: false,
	xAxisArrow: false,
	drawGraphAnimation: {
		duration: 3,
		timing: 'easeOutSine'
	},
	newDataAnimation: {
		duration: 1,
		timing: 'easeOutSine'
	},
	// offsetRight: 0.25,
	// offsetLeft: 0.4,
	style: graphStyle,
	// showLabels: false,
	// xLabels: [
	// 	'Mon',
	// 	'Tue',
	// 	'Wed',
	// 	'Thu',
	// 	'Fri',
	// 	'Sat',
	// 	'Sun',
	// ],
	// fillCurve: true
})
</script>

<template>
  <div>
    <div
      v-if="selectedPoint"
      class="select-none absolute w-12 h-12 bg-blue-100 z-[9999]"
      :style="{ left: `${selectedPoint?.x}px`, top: `${selectedPoint?.y}px` }"
    >
      <div class="text-xl font-black text-center"> 
        {{ selectedData?.x }}
      </div>

      <div class="text-xl font-black text-center">
        {{ selectedData?.y }}
      </div>
    </div>
    <canvas
      ref="canvas"
      height="300"
      width="800"
    />
  </div>
</template>

