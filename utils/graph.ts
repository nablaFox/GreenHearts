import type { DeepRequired } from './defaults'
import easing from './easing'

export type Point = { x: number; y: number }

// TODO: add delay
export interface AnimationOpts {
	duration?: number
	timing?: keyof typeof easing
}

export interface GraphDrawingOpts {
	index: number
	points: Point[]
}

export interface GraphPointsDrawingOpts {
	radius?: number
}

export interface OnGraphClickOpts {
	ctx: CanvasRenderingContext2D,
	data: Point	| null
}

export interface GraphStyle {
	curveWidth?: number
	curveColor?: string
	curveFill?: string
	pointRadius?: number
	pointColor?: string
	pointStroke?: string
	mainHLineWidth?: number
	mainHLineDash?: number[]
	mainHLineColor?: string
	mainVLineWidth?: number
	mainVLineDash?: number[]
	mainVLineColor?: string
	selectedLineWidth?: number
	selectedLineDash?: number[]
	selectedLineColor?: string
	labelColor?: string
	labelFont?: string
	xAxisWidth?: number
	xAxisColor?: string
	xAxisDash?: number[]
	yAxisWidth?: number
	yAxisColor?: string
	yAxisDash?: number[]
	gradientFill?: boolean
	fillCurve?: boolean
}

export interface GraphOptions {
	showDataPoints?: boolean
	precision?: number
	newDataAnimation?: AnimationOpts | false
	changeDataAnimation?: AnimationOpts	| false
	drawGraphAnimation?: AnimationOpts | false
	dataShiftAnimation?: AnimationOpts | false
	mainHorizontalLines?: boolean
	mainVerticalLines?: boolean
	offsetTop?: number
	offsetBottom?: number
	offsetRight?: number
	offsetLeft?: number
	totalYLabels?: number
	style?: GraphStyle
	xLabels?: string[]
	xLabelsOffset?: number
	yLabelsOffset?: number
	showXAxis?: boolean
	showYAxis?: boolean
	xAxisArrow?: boolean
	yAxisArrow?: boolean
	yAxisPrecision?: number
	showYLabels?: boolean
	showXLabels?: boolean
}

const defaultGraphStyle: GraphStyle = {
	curveWidth: 4,
	curveColor: '#000',
	curveFill: '#242424',

	pointRadius: 5,
	pointColor: '#000',
	pointStroke: '#fff',

	xAxisWidth: 1,
	xAxisColor: '#000',
	xAxisDash: [0],

	yAxisWidth: 1,
	yAxisColor: '#000',
	yAxisDash: [0],

	mainHLineWidth: 1,
	mainHLineDash: [5],
	mainHLineColor: '#000',

	mainVLineWidth: 1,
	mainVLineDash: [5],
	mainVLineColor: '#000',

	selectedLineWidth: 1,
	selectedLineDash: [5],
	selectedLineColor: '#6a5bd9',

	labelColor: '#000',
	labelFont: 'medium 14px Montserrat',
}

const defaultOptions: GraphOptions = {
	precision: 100,
	drawGraphAnimation: { 
		timing: 'linear',
		duration: .5 
	},
	changeDataAnimation: { 
		timing: 'linear',
		duration: .5 
	},
	newDataAnimation: { 
		timing: 'linear',
		duration: .5 
	},
	dataShiftAnimation: { 
		timing: 'linear',
		duration: .5 
	},
	showDataPoints: false,
	mainHorizontalLines: true,
	mainVerticalLines: true,
	showXAxis: true,
	showYAxis: true,
	xAxisArrow: true,
	yAxisArrow: true,
	yAxisPrecision: 0,
	showYLabels: true,
	showXLabels: true,

	offsetTop: 20,
	offsetBottom: 40,
	offsetRight: 30,
	offsetLeft: 50,

	totalYLabels: 5,
	xLabelsOffset: 15,
	yLabelsOffset: 10,

	style: defaultGraphStyle,
}

type SelectedData = {
	x: number
	y: number
	label: string
}

export function useGraph(
	canvas: Ref<HTMLCanvasElement | null>, 
	data: Point[], 
	opts: GraphOptions = defaultOptions
) {
	mergeDefaults(defaultOptions, opts)
	const style = opts.style! as Required<GraphStyle>

	const { 
		ctx: canvasCtx, 
		clearCanvas, 
		drawLine,
		drawCircle,
		drawCircleStrokeFill,
		adjustAlpha,
		drawArrow,
	}	= useCanvas2d(canvas, { onCursorMove, onClickUp, onClickDown })

	const { 
		length: graphLength, 
		points: graphPoints, 
		interpolate 
	} = useSpline(data, 1 / opts.precision!)

	let oldTimestamp: number
	let dt: number
	let graphIndex = 0
	let oldGraphLength = 0
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
	let currentPoints: Point[]
	let oldPoints: Point[]
	let drawed = false
	let newDataAdded = false
	let dataChanged = false
	let shifted = false
	let ctx: CanvasRenderingContext2D
	let selectedDataLine = false
	let yRange: number
	let xRange: number
	let width: number
	let height: number

	const selectedData = ref<SelectedData | null>(null)
	const selectedPoint = computed(() => {
		if (!selectedData.value) return null
		const { x, y } = selectedData.value
		return { x: normalizeX(x), y: normalizeY(y) }
	})
	
	function normalizeY(y: number) {
		const range = currentMaxY - currentMinY || 1
		const h = height - (opts.offsetBottom! + opts.offsetTop!)
		return (h - (y - currentMinY) / range * h) + opts.offsetTop!
	}

	function denormalizeY(y: number) {
		const h = height - (opts.offsetBottom! + opts.offsetTop!)
		return (y - opts.offsetTop!) / h * yRange + currentMinY
	}

	function normalizeX(x: number) {
		const width = canvas.value!.offsetWidth - (opts.offsetLeft! + opts.offsetRight!)
		return ((x - currentMinX) / (currentMaxX - currentMinX) * width) + opts.offsetLeft!
	}

	function denormalizeX(x: number) {
		const w = width - (opts.offsetLeft! + opts.offsetRight!)
		return ((x - opts.offsetLeft!) / w) * xRange + currentMinX
	}

	function setBounds() {
		const yValues = graphPoints.value.map((d) => d.y)
		const xValues = data.map((d) => d.x)

		maxY = Math.max(...yValues)
		minY = Math.min(...yValues)

		maxX = Math.max(...xValues)
		minX = Math.min(...xValues)

		currentMaxY = maxY
		currentMinY = minY
		currentMaxX = maxX
		currentMinX = minX

		yRange = maxY - minY || 1
		xRange = maxX - minX || 1
	}

	function setOld() {
		oldMaxY = currentMaxY
		oldMinY = currentMinY
		oldMaxX = currentMaxX
		oldMinX = currentMinX
		oldPoints = currentPoints
	}

	function init() {
		dt = 0
		oldTimestamp = performance.now()
		graphIndexOld = graphIndex
		oldGraphLength = graphLength.value
		width = canvas.value!.offsetWidth
		height = canvas.value!.offsetHeight

		interpolate()	
		setBounds()

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
		const {
			drawGraphAnimation,
			newDataAnimation,
			changeDataAnimation,
			dataShiftAnimation
		} = opts as DeepRequired<GraphOptions>

		drawGraphAnimation && animateDrawGraph(drawGraphAnimation) // TODO: make it work with change animation
		newDataAnimation && animateGraphNewData(newDataAnimation)
		changeDataAnimation && animateGraphChange(changeDataAnimation)
		dataShiftAnimation && animateScaleShift(dataShiftAnimation)
		
		if (
			newDataAdded
			|| dataChanged
			|| !drawed
			|| shifted
		) {
			requestAnimationFrame(main)
		}
	}

	function updateFrame() { requestAnimationFrame(main) }

	function createAnimation(
		duration: number,
		callback: (update: number) => void,
		onComplete?: () => void
	) {
		const update = Math.min(Math.abs(dt / duration), 1)
		callback(update)

		if (update === 1) return onComplete && onComplete() 
	}

	function animateDrawGraph(opts: Required<AnimationOpts>) {
		if (drawed) return
		
		createAnimation(opts.duration, update => {
			graphIndex = easing[opts.timing!](0, graphLength.value, update)
		}, () => drawed = true) 
	}

	function animateGraphNewData(opts: Required<AnimationOpts>) {
		if (!newDataAdded) return

		createAnimation(opts.duration, update => {
			graphIndex = easing[opts.timing](graphIndexOld, graphLength.value, update)
		}, () => newDataAdded = false)
	}

	function animateGraphChange(opts: Required<AnimationOpts>) {
		if (!dataChanged) return

		createAnimation(opts.duration, update => {
			for (let i = 0; i < Math.min(oldGraphLength, graphLength.value); i++) {
				currentPoints[i].y = easing[opts.timing](oldPoints[i].y, graphPoints.value[i].y, update)
			}
		}, () => dataChanged = false)
	}

	function animateScaleShift(opts: Required<AnimationOpts>) {
		if (!shifted) return

		const ease = easing[opts.timing]

		createAnimation(opts.duration, update => {
			currentMaxY = ease(oldMaxY, maxY, update)
			currentMinY = ease(oldMinY, minY, update)
			currentMaxX = ease(oldMaxX, maxX, update)
			currentMinX = ease(oldMinX, minX, update)
		}, () => shifted = false)
	}

	function draw() {
		clearCanvas()

		drawGraph({
			index: graphIndex, 
			points: currentPoints,
		})

		opts.mainHorizontalLines && drawMainHorizontalLines()
		opts.mainVerticalLines && drawMainVerticalLines()

		opts.showXAxis && drawXAxis()
		opts.showYAxis && drawYAxis()

		opts.showXLabels && drawXLabels()
		opts.showYLabels && drawYLabels()

		selectedDataLine && drawSelectedVerticalLine()
		opts.showDataPoints && drawDataPoints() 
	}

	function drawGraphPoints({
		index,
		points,
	} : GraphDrawingOpts) {
		ctx.moveTo(normalizeX(points[0].x), normalizeY(points[0].y))
		for (let i = 0; i < index; i++) {
			ctx.lineTo(
				normalizeX(points[i].x),
				normalizeY(points[i].y)
			)
		}
	}

	function drawGraph({
		index,
		points,
	}: GraphDrawingOpts) {
		ctx.beginPath()
		ctx.lineWidth = style.curveWidth
		ctx.strokeStyle = style.curveColor

		drawGraphPoints({ index, points })
		ctx.stroke()

		if (!style.fillCurve) return

		ctx.beginPath()

		if (style.gradientFill) {
			const gradient = ctx.createLinearGradient(0,  0,  0, height)
			gradient.addColorStop(0, style.curveFill)
			gradient.addColorStop(1, adjustAlpha(style.curveFill, 0))
			ctx.fillStyle = gradient
		} else {
			ctx.fillStyle = style.curveFill
		}

		drawGraphPoints({ index, points })

		ctx.lineTo(normalizeX(points[Math.round(index) - 1]?.x), height - opts.offsetBottom!)
		ctx.lineTo(normalizeX(points[0].x), height - opts.offsetBottom!)
		ctx.closePath()
		ctx.fill()
	}

	function drawDataPoints() {
		ctx.strokeStyle = style.pointStroke
		ctx.fillStyle = style.pointColor
		data.forEach(({ x, y }) => {
			drawCircle(
				normalizeX(x),
				normalizeY(y),
				style.pointRadius
			)
		})
	}

	function drawXLabels() {
		ctx.fillStyle = style.labelColor
		ctx.font = style.labelFont

		const offsetBottom = opts.xLabelsOffset!

		const posY = height - offsetBottom 
		const start = normalizeX(data[0].x)
		const step = (normalizeX(data.at(-1)!.x) - start) / (data.length - 1)

		ctx.textAlign = 'center'
		data.forEach((p, i) => {	
			const posX = start + step * i

			const content = opts.xLabels ?
				(opts.xLabels[i] || p.x.toString()) : p.x.toString()
	
			ctx.fillText(content, posX, posY)
		})

		ctx.textAlign = 'start'
	}

	function drawYLabels() {
		ctx.fillStyle = style.labelColor
		ctx.font = style.labelFont
		ctx.textBaseline = 'middle'

		const { totalYLabels: totalLabels, yLabelsOffset: offsetX } = opts		
		const precision = opts.yAxisPrecision!

		const startX = opts.offsetLeft! - offsetX! - 18
		const startY = opts.offsetTop!

		if (yRange === 1) return

		const step = (height - opts.offsetTop!) / totalLabels!
		const contentStep = yRange / (totalLabels! - 1)

		for (let i = 0; i < totalLabels!; i++) {	
			const content = (currentMaxY - contentStep * i).toFixed(precision)
			ctx.fillText(content, startX, startY + step * i)
		}

		ctx.textBaseline = 'alphabetic'
	}

	// TODO: fix positions
	function drawHorizontalLine(
		y: number,
		{ length }: { length: number }
	) {
		const start = opts.offsetLeft!
		drawLine(start, y, length, y)
	}

	function drawVerticalLine(
		x: number,
		{ length }: { length: number }) {
		drawLine(x, normalizeY(currentMinY), x, length)
	}

	function drawSelectedVerticalLine() {
		ctx.lineWidth = style.selectedLineWidth
		ctx.strokeStyle = style.selectedLineColor
		ctx.setLineDash(style.selectedLineDash)

		const x = normalizeX(selectedData.value!.x)
		const length = normalizeY(selectedData.value!.y)

		drawVerticalLine(x, { length })

		ctx.fillStyle = style.pointColor
		ctx.strokeStyle = style.pointStroke
		ctx.lineWidth = style.pointRadius / 2
		ctx.setLineDash([])
		drawCircleStrokeFill(x, length, style.pointRadius)
	}

	function drawYAxis() {
		ctx.lineWidth = style.yAxisWidth
		ctx.strokeStyle = style.yAxisColor
		ctx.setLineDash(style.yAxisDash)

		const start = opts.offsetLeft!
		const length = opts.offsetTop!
		drawVerticalLine(start, { length })

		opts.yAxisArrow && drawArrow(start, opts.offsetTop!, { rotation: 90, width: 1.5, angle: 35, length: 7 })

		ctx.setLineDash([])
	}

	function drawXAxis() {
		ctx.lineWidth = style.xAxisWidth
		ctx.strokeStyle = style.xAxisColor
		ctx.setLineDash(style.xAxisDash)

		const start = height - opts.offsetBottom!
		const end = width - opts.offsetRight!

		drawLine(opts.offsetLeft!, start, end, start)
		opts.xAxisArrow && drawArrow(end, start, { width: 1.5, angle: 35, length: 7, rotation: 180 })

		ctx.setLineDash([])
	}

	function drawMainVerticalLines() {
		ctx.setLineDash(style.mainVLineDash)
		ctx.lineWidth = style.mainVLineWidth
		ctx.strokeStyle = style.mainVLineColor

		const start = normalizeX(data[0].x)
		const step = (normalizeX(data.at(-1)!.x) - start) / (data.length - 1)

		for (let i = 1; i < data.length; i++) {
			const x = start + step * i
			drawVerticalLine(x, { length: opts.offsetTop! })
		}	

		ctx.setLineDash([])
	}

	function drawMainHorizontalLines() {
		if (yRange === 1) return

		const start = opts.offsetTop!
		const length = height - opts.offsetTop!

		const stepY = length / (opts.totalYLabels!)

		ctx.lineWidth = style.mainHLineWidth
		ctx.strokeStyle = style.mainHLineColor
		ctx.setLineDash(style.mainHLineDash)

		for (let i = 0; i < opts.totalYLabels!; i++) {
			const y = start + stepY * i
			drawHorizontalLine(y, { length: width - opts.offsetRight! })
		}

		ctx.setLineDash([])
	}

	function getSelectedData(x: number) {
		const index = Math.round(denormalizeX(x))
		if (data[index]) {
			const { x, y } = data[index]
			const label = opts.xLabels ? opts.xLabels[index] : x.toString()
			selectedData.value = { x, y, label }
		}

		!selectedData.value && (selectedDataLine = false)	
	}

	function onClickDown(x: number, _: number) {
		getSelectedData(x)
		selectedDataLine = true
		updateFrame()
	}

	function onClickUp() {
		selectedDataLine = false
		selectedData.value = null
		updateFrame()
	}

	function onCursorMove(x: number, _: number) {
		if (selectedDataLine) {
			getSelectedData(x)
			updateFrame()
		}
	}

	// TODO: handle resize
	// TODO: reload when config changes
	onMounted(() => {
		ctx = canvasCtx.value!
		init()
	})

	watch(data, () => {
		shifted = true

		setOld()
		init()

		oldGraphLength === graphLength.value ? 
			(dataChanged = true) : (newDataAdded = true)
	})

	watch(opts, updateFrame)

	return {
		ctx: canvasCtx,
		selectedData,
		selectedPoint
	}
}

export function getGraphData(
	data: MaybeRefOrGetter<any[] | null | undefined>,
	key: string,
	defaultValue?: any[]
) {
	const defValue = [
		{ x: 0, y: 0 },
		{ x: 1, y: 0 }
	]

	const _data = computed(() => {
		let d = toValue(data)

		if (!d || d.length < 2)
			d = defaultValue

		if (!d) return defValue

		return d.map((item, index) => ({
			x: index,
			y: item[key],
		}))
	})

	return toReactive(_data)
}
