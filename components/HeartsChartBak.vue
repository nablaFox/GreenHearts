<script lang="ts" setup>
const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = computed(() => canvas.value?.getContext('2d'))

type Point = { x: number; y: number }

const p = defineProps<{
	data: Point[]
}>()	

const { length: graphLength, points: graphPoints, interpolate } = useSpline(p.data)

function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t
}

function normalizeY(y: number) {
	return canvas.value!.height - (y - currentMinY) / (currentMaxY - currentMinY) * canvas.value!.height
}

function normalizeX(x: number) {
	return (x - currentMinX) / (currentMaxX - currentMinX) * canvas.value!.width
}

function initCanvas() {	
	const devicePixelRatio = window.devicePixelRatio ||  1
	canvas.value!.width = canvas.value!.offsetWidth * devicePixelRatio
	canvas.value!.height = 180 * devicePixelRatio
}

function clearCanvas() {
	const { width, height } = ctx.value!.canvas
	ctx.value!.clearRect(0, 0, width, height)
}

let oldTimestamp: number
let dt: number
let graphIndex = 0
let graphIndexOld: number
let maxY: number
let minY: number
let maxX: number
let minX: number
let oldMaxY: number
let oldMinY: number
let oldMaxX: number
let oldMinX: number
let currentMaxY: number
let currentMinY: number
let currentMaxX: number
let currentMinX: number
let changed = false
let currentPoints: typeof graphPoints.value
let oldPoints: typeof graphPoints.value
let oldGraphLength: number

function setBounds() {
	const yValues = p.data.map((d) => d.y)
	const xValues = p.data.map((d) => d.x)

	maxY = Math.max(...yValues) + 3
	minY = Math.min(...yValues) - 3
	maxX = Math.max(...xValues) + 1
	minX = Math.min(...xValues) - 1

	currentMaxY = maxY
	currentMinY = minY
	currentMaxX = maxX
	currentMinX = minX
}

function setOld() {
	oldMaxY = currentMaxY
	oldMinY = currentMinY
	oldMaxX = currentMaxX
	oldMinX = currentMinX
	oldPoints = currentPoints
	oldGraphLength = graphLength.value
}

function init() {
	dt = 0
	oldTimestamp = performance.now()
	graphIndexOld = graphIndex
	setBounds()

	interpolate()
	
	currentPoints = oldGraphLength === graphLength.value 
		? oldPoints : graphPoints.value

	requestAnimationFrame(main)
}

function main(timeStamp: number) {
	dt += (timeStamp - oldTimestamp) / 1000
	oldTimestamp = timeStamp

	update()
	draw()
}

function update() {	
	animateGraphNewData({ duration: 0.5 })	
	animateGraphChange(.5)

	if (
		graphIndex < graphLength.value 
		|| changed
	) {
		requestAnimationFrame(main)
	}
}

interface AnimateDrawGraphOptions {
	duration?: number
	updateDuration?: number	
}

function animateGraphNewData(opts: AnimateDrawGraphOptions = {}) {
	const duration = graphIndexOld ? (opts.updateDuration || .5) : (opts.duration || 1)
	const update = Math.min(dt / duration, 1)
	graphIndex = lerp(graphIndexOld, graphLength.value, update)
}

function animateGraphChange(duration: number) {
	if (!changed) return

	const update = Math.min(Math.abs(dt / duration), 1)

	currentMaxY = lerp(oldMaxY, maxY, update)
	currentMinY = lerp(oldMinY, minY, update)
	currentMaxX = lerp(oldMaxX, maxX, update)
	currentMinX = lerp(oldMinX, minX, update)

	if (oldGraphLength === graphLength.value)
		for (let i = 0; i < graphLength.value; i++) {
			currentPoints[i].y = lerp(oldPoints[i].y, graphPoints.value[i].y, update)
		}

	update === 1 && (changed = false)
}

function draw() {
	clearCanvas()

	drawGraph({
		index: graphIndex, 
		points: currentPoints,
		ctx: ctx.value!
	})

	drawPoints({
		points: p.data,
		ctx: ctx.value!
	})
}

interface GraphDrawingOpts {
	index: number
	points: typeof graphPoints.value
	lineWidth?: number
	ctx: CanvasRenderingContext2D
}

function drawGraph({
	index,
	points,
	ctx,
	lineWidth = 4
}: GraphDrawingOpts) {
	ctx.lineWidth = lineWidth
	ctx.beginPath()
	ctx.moveTo(normalizeX(points[0].x), normalizeY(points[0].y))

	for (let i = 0; i < index; i++) {
		ctx.lineTo(
			normalizeX(points[i].x),
			normalizeY(points[i].y)
		)
	}	

	ctx.stroke()
}

interface GraphPointsDrawingOpts {
	points: typeof graphPoints.value
	ctx: CanvasRenderingContext2D
	radius?: number
}

function drawPoints({
	points,
	ctx,
	radius = 5
}: GraphPointsDrawingOpts) {
	points.forEach(({ x, y }) => {
		ctx.beginPath()
		ctx.arc(
			normalizeX(x), 
			normalizeY(y),
			radius,
			0, 
			Math.PI * 2, 
			true
		)
		ctx.fill()
	})
}

onMounted(() => {
	initCanvas()
	init()
})

watch(p, () => {
	changed = true
	setOld()
	init()
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

