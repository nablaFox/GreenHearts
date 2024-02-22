type CanvasMouseEvent = (x: number, y: number) => void

export interface CanvasOptions {
	onClick?: CanvasMouseEvent
	onClickUp?: CanvasMouseEvent
	onClickDown?: CanvasMouseEvent
	onCursorMove?: CanvasMouseEvent
}

export function useCanvas2d(canvas: Ref<HTMLCanvasElement | null>, opts?: CanvasOptions) {
	const ctx = computed(() => canvas.value?.getContext('2d')) 

	function clearCanvas() {
		const { width, height } = ctx.value!.canvas
		ctx.value!.clearRect(0, 0, width, height)
	}

	function drawLine(x1: number, y1: number, x2: number, y2: number) {
		ctx.value!.beginPath()
		ctx.value!.moveTo(x1, y1)
		ctx.value!.lineTo(x2, y2)
		ctx.value!.stroke()
	}

	function drawCircle(x: number, y: number, radius: number) {
		ctx.value!.beginPath()
		ctx.value!.arc(x, y, radius, 0, Math.PI * 2)
		ctx.value!.fill()
	}

	function drawCircleStroke(x: number, y: number, radius: number) {
		ctx.value!.beginPath()
		ctx.value!.arc(x, y, radius, 0, Math.PI * 2)
		ctx.value!.stroke()
	}

	function drawCircleStrokeFill(x: number, y: number, radius: number) {
		ctx.value!.beginPath()
		ctx.value!.arc(x, y, radius, 0, Math.PI * 2)
		ctx.value!.fill()
		ctx.value!.stroke()
	}

	function adjustAlpha(color: string, newAlpha: number) {
		const rgbaRegex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/
		const match = color.match(rgbaRegex)

		if (!match)
			return color

		const r = parseInt(match[1],  10)
		const g = parseInt(match[2],  10)
		const b = parseInt(match[3],  10)

		newAlpha = Math.max(0, Math.min(1, newAlpha))

		return `rgba(${r}, ${g}, ${b}, ${newAlpha})`
	}

	function drawArrow(
		x: number,   
		y: number,
		{ angle = 30, length = 10, width = 2, rotation = 0 }: { angle?: number, length?: number, width?: number, rotation?: number } = {}
	) {
    ctx.value!.lineWidth = width

    const rotationRadians = rotation * Math.PI /  180

    ctx.value!.translate(x, y)
    ctx.value!.rotate(rotationRadians)

    const angle1 = angle * Math.PI /  180
    const angle2 = -angle * Math.PI /  180

    const x1 = length * Math.cos(angle1) - width /  2 * Math.cos(angle1)
    const y1 = length * Math.sin(angle1) - width /  2 * Math.sin(angle1)

    const x2 = length * Math.cos(angle2) - width /  2 * Math.cos(angle2)
    const y2 = length * Math.sin(angle2) - width /  2 * Math.sin(angle2)

    ctx.value!.beginPath()
    ctx.value!.moveTo(0,  0)
    ctx.value!.lineTo(x1, y1)
    ctx.value!.moveTo(0,  0)
    ctx.value!.lineTo(x2, y2)
    ctx.value!.stroke()

    ctx.value!.setTransform(1,  0,  0,  1,  0,  0)
	}

	onMounted(() => {
		const rect = canvas.value!.getBoundingClientRect()

		const getCoords = (e: MouseEvent | TouchEvent) => { 
			const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
			const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY

			const x = clientX - rect.left
			const y = clientY - rect.top
			return { x, y }
		}

		canvas.value!.addEventListener('click', e => {
			if (!opts?.onClick) return

			const { x, y } = getCoords(e)
			opts.onClick(x, y)
		})

		canvas.value!.addEventListener('mouseup', e => {
			if (!opts?.onClickUp) return
			const { x, y } = getCoords(e)
			opts.onClickUp(x, y)
		})

		canvas.value!.addEventListener('mousedown', e => {
			if (!opts?.onClickDown) return
			const { x, y } = getCoords(e)
			opts.onClickDown(x, y)
		})

		canvas.value!.addEventListener('mousemove', e => {
			if (!opts?.onCursorMove) return
			const { x, y } = getCoords(e)
			opts.onCursorMove(x, y)
		})

		canvas.value!.addEventListener('touchstart', e => {
			if (!opts?.onClickDown) return
			const { x, y } = getCoords(e)
			opts.onClickDown(x, y)
		})

		canvas.value!.addEventListener('touchend', () => {
			if (!opts?.onClickUp) return
			opts.onClickUp(0, 0)
		})

		canvas.value!.addEventListener('touchmove', e => {
			if (!opts?.onCursorMove) return
			const { x, y } = getCoords(e)
			opts.onCursorMove(x, y)
		})
	})

	return {
		drawArrow,
		drawCircleStrokeFill,
		drawCircleStroke,
		drawCircle,
		drawLine,
		ctx,
		adjustAlpha,
		clearCanvas
	}
}
