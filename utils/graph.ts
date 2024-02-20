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
	lineWidth?: number
	ctx: CanvasRenderingContext2D
}

export interface GraphPointsDrawingOpts {
	points: Point[]
	ctx: CanvasRenderingContext2D
	radius?: number
}

export interface GraphOptions {
	showPoints?: boolean
	precision?: number
	newDataAnimation?: AnimationOpts | false
	changeDataAnimation?: AnimationOpts	| false
	drawGraphAnimation?: AnimationOpts | false
	dataShiftAnimation?: AnimationOpts | false
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
	showPoints: false
}

export function useGraph(
	canvas: Ref<HTMLCanvasElement | null>, 
	data: Point[], 
	opts: GraphOptions = defaultOptions
) {
	mergeDefaults(defaultOptions, opts)

	const { ctx, clearCanvas } = useCanvas2d(canvas)

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
	
	// FIX: can't read width of null
	function normalizeY(y: number) {
		return canvas.value!.height - (y - currentMinY) / (currentMaxY - currentMinY) * canvas.value!.height
	}

	function normalizeX(x: number) {
		return (x - currentMinX) / (currentMaxX - currentMinX) * canvas.value!.width
	}

	function setBounds() {
		const yValues = data.map((d) => d.y)
		const xValues = data.map((d) => d.x)

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
	}

	function init() {
		dt = 0
		oldTimestamp = performance.now()
		graphIndexOld = graphIndex
		oldGraphLength = graphLength.value
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
		const {
			drawGraphAnimation,
			newDataAnimation,
			changeDataAnimation,
			dataShiftAnimation
		} = opts

		drawGraphAnimation && animateDrawGraph(drawGraphAnimation)
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

	function createAnimation(
		duration: number,
		callback: (update: number) => void,
		onComplete?: () => void
	) {
		const update = Math.min(Math.abs(dt / duration), 1)
		callback(update)

		if (update === 1) return onComplete && onComplete() 
	}

	function animateDrawGraph(opts: AnimationOpts) {
		if (drawed) return
		
		createAnimation(opts.duration!, update => {
			graphIndex = easing[opts.timing!](0, graphLength.value, update)
		}, () => drawed = true) 
	}

	function animateGraphNewData(opts: AnimationOpts) {
		if (!newDataAdded) return

		createAnimation(opts.duration!, update => {
			graphIndex = easing[opts.timing!](graphIndexOld, graphLength.value, update)
		}, () => newDataAdded = false)
	}

	function animateGraphChange(opts: AnimationOpts) {
		if (!dataChanged) return

		createAnimation(opts.duration!, update => {
			for (let i = 0; i < Math.min(oldGraphLength, graphLength.value); i++) {
				currentPoints[i].y = easing[opts.timing!](oldPoints[i].y, graphPoints.value[i].y, update)
			}
		}, () => dataChanged = false)
	}

	function animateScaleShift(opts: AnimationOpts) {
		if (!shifted) return

		const ease = easing[opts.timing!]

		createAnimation(opts.duration!, update => {
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
			ctx: ctx.value!
		})

		opts.showPoints && drawPoints({
			points: data,
			ctx: ctx.value!
		})
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

	onMounted(init)

	watch(data, () => {
		shifted = true

		setOld()
		init()

		oldGraphLength === graphLength.value ? 
			(dataChanged = true) : (newDataAdded = true)
	})
}
