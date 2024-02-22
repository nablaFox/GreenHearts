<script lang="ts" setup>
import type { GraphStyle, GraphOptions } from '~/utils/graph'
import { theme } from '#tailwind-config'

const testData = reactive(new Array(7).fill(0).map((_, i) => ({ x: i, y: Math.random() * 10 })))

function addData() {
	testData.push({ x: testData.length, y: Math.random() * 10 })
}

function modifyData() {
	const index = Math.floor(Math.random() * testData.length)
	testData[index].y = Math.random() * 10
}

const canvas = ref<HTMLCanvasElement | null>(null)
useCanvas2d(canvas)

function getThemeVar(color: string) {
	color = color.replace('var(', '').replace(')', '')
	return getComputedStyle(document.documentElement).getPropertyValue(color)
}

const mainColor = 'rgb(175 242 196)'

const graphStyle: GraphStyle = {
	curveColor: mainColor,
	curveWidth: 5,

	curveFill: mainColor,
	fillCurve: true,
	gradientFill: true,

	labelColor: getThemeVar(theme.colors['on-surface-variant']),
	labelFont: '500 10px Montserrat',

	xAxisWidth: 0.3,
	xAxisColor: getThemeVar(theme.colors['on-surface-variant']),


	yAxisColor: getThemeVar(theme.colors['on-surface']),
	yAxisWidth: 0.4,
	yAxisDash: [3],
	mainVLineColor: getThemeVar(theme.colors['secondary']),
	mainVLineDash: [3],
	mainVLineWidth: 0.4,

	selectedLineColor: getThemeVar(theme.colors['on-surface-variant']),
	selectedLineWidth: 0.4,
	selectedLineDash: [3],
	pointColor: mainColor,
	pointStroke: 'white',
}

const graphOptions: GraphOptions = {	
	precision: 100,
	totalYLabels: 7,
	yAxisPrecision: 1,

	offsetTop: 20,
	offsetBottom: 30,
	offsetLeft: 30,
	offsetRight: 30,

	xLabelsOffset: 10,

	mainHorizontalLines: false,
	showXAxis: false,
	showYLabels: false,
	yAxisArrow: false,

	drawGraphAnimation: {
		duration: 3,
		timing: 'easeOutSine'
	},
	newDataAnimation: {
		duration: 1,
		timing: 'easeOutSine'
	},
	xLabels: [
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
		'Sun',
	],
	style: graphStyle,
}

const { selectedData, selectedPoint } = useGraph(canvas, testData, graphOptions)
</script>

<template>
  <div class="border border-outline rounded-lg">
    <div 
      v-if="selectedPoint"
      class="flex flex-col items-center absolute bg-primary-container rounded-md border-outline px-4 py-0 z-10 text-on-primary-container text-xs -translate-y-1/2 -translate-x-[calc(100%+10px)]"
      :style="{ top: selectedPoint?.y + 'px', left: selectedPoint?.x + 'px' }"
    >
      <div class="font-bold">
        {{ selectedData?.label }}
      </div>

      <div class="flex-center font-extrabold">
        <Icon name="ic:baseline-favorite" />
        {{ selectedData?.y.toFixed(0) }}
      </div>
    </div>

    <canvas
      ref="canvas"
      class="w-full h-full"
      height="100"
      width="100"
      @click="modifyData"
    />
  </div>
</template>

