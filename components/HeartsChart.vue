<script lang="ts" setup>
import type { GraphStyle, GraphOptions } from '~/utils/graph'
import '@material/web/iconbutton/outlined-icon-button'

const colors = getThemeColors()

const mainColor = 'rgb(175 242 196)' // TODO: do better

const graphStyle: GraphStyle = {
	curveColor: mainColor,
	curveWidth: 5,

	curveFill: mainColor,
	fillCurve: true,
	gradientFill: true,

	labelColor: colors['on-surface-variant'],
	labelFont: '500 10px Montserrat',

	xAxisWidth: 0.3,
	xAxisColor: colors['on-surface-variant'],

	yAxisColor: colors['secondary'],
	yAxisWidth: 0.4,
	yAxisDash: [3],
	mainVLineColor: colors['secondary'],
	mainVLineWidth: 0.4,
	mainVLineDash: [3],

	selectedLineColor: colors['on-surface-variant'],
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

const { stats, defaultStats, thereAreStats } = useWeekData()

const graphData = getGraphData(
	stats,
	'total',
	defaultStats,
)

const canvas = ref<HTMLCanvasElement | null>(null)
const { selectedData, selectedPoint } = useGraph(canvas, graphData, reactive(graphOptions))

watch(thereAreStats, v => {
	graphOptions.mainVerticalLines = v
	graphOptions.showYAxis = v
	graphOptions.showXLabels = v
	
}, { immediate: true })

const translateX = computed(() => selectedData.value?.x ? 'calc(-1 * calc(100% + 10px))' : '10px')
</script>

<template>
  <div class="border border-outline rounded-lg">
    <div 
      v-if="selectedPoint"
      class="flex flex-col items-center absolute bg-primary-container rounded-md border-outline px-4 py-0 z-10 text-on-primary-container text-xs -translate-y-1/2"
      :style="{ top: selectedPoint?.y + 'px', left: selectedPoint?.x + 'px', transform: `translateX(${translateX})` }"
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
    />

    <template v-if="!thereAreStats">
      <div 
        class="top-0 left-0 absolute w-full h-full rounded-lg bg-surface z-100 opacity-[.75]"
      />

      <div class="flex-center abs-center">
        <h1 class="text-on-surface-variant font-bold text-lg max-w-[130px] text-center leading-[1]">
          Can't wait for progress!
        </h1>
	
        <Icon
          class="text-on-surface abs-center-x -bottom-8"
          name="tabler:robot"
          size="20"
        />
      </div>
    </template>
  </div>
</template>

