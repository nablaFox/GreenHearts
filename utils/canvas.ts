type CanvasMouseEvent = (x: number, y: number) => void

export interface CanvasOptions {
	onClick?: CanvasMouseEvent
	onClickUp?: CanvasMouseEvent
	onClickDown?: CanvasMouseEvent
	onCursorMove?: CanvasMouseEvent
}

export function useCanvas2d(canvas: Ref<HTMLCanvasElement | null>, opts?: CanvasOptions) {
	const ctx = computed(() => canvas.value?.getContext('2d')) 

	// TODO: avoid using ctx.value everywhere
	
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

    // TODO: better way to reset the transformation
    ctx.value!.setTransform(devicePixelRatio,  0,  0,  devicePixelRatio,  0,  0)
	}

	function adjustAlpha(color: string, newAlpha: number) {
		const rgbRegex = /^rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)$|^rgb\((\d+)\s+(\d+)\s+(\d+)\)$/
		const matchRgb = color.match(rgbRegex)

		if (matchRgb) {
			const r = parseInt(matchRgb[1] || matchRgb[4],  10)
			const g = parseInt(matchRgb[2] || matchRgb[5],  10)
			const b = parseInt(matchRgb[3] || matchRgb[6],  10)
			newAlpha = Math.max(0, Math.min(1, newAlpha))
			return `rgba(${r}, ${g}, ${b}, ${newAlpha})`
		}

		const rgbaRegex = /^rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\)$|^rgba\((\d+)\s+(\d+)\s+(\d+)\s+([\d.]+)\)$/
		const matchRgba = color.match(rgbaRegex)

		if (!matchRgba) {
			return color
		}

		const r = parseInt(matchRgba[1] || matchRgba[5],  10)
		const g = parseInt(matchRgba[2] || matchRgba[6],  10)
		const b = parseInt(matchRgba[3] || matchRgba[7],  10)
		newAlpha = Math.max(0, Math.min(1, newAlpha))

		return `rgba(${r}, ${g}, ${b}, ${newAlpha})`
	}

	function getCoords(e: MouseEvent | TouchEvent) { 
		const rect = canvas.value!.getBoundingClientRect()

		const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX
		const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY

		const x = clientX - rect.left
		const y = clientY - rect.top
		return { x, y }
	}

	function fixDpi() {
		const cvs = canvas.value!
		const ctx = cvs.getContext('2d')!
		const rect = cvs.getBoundingClientRect()

		cvs.width = rect.width * devicePixelRatio
		cvs.height = rect.height * devicePixelRatio

		ctx.scale(devicePixelRatio, devicePixelRatio)

		cvs.style.width = `${rect.width}px`
		cvs.style.height = `${rect.height}px`
	}

	function setEvents() {
		opts?.onClick && canvas.value!.addEventListener('click', e => {
			const { x, y } = getCoords(e)
			opts.onClick!(x, y)
		})

		opts?.onClickUp && canvas.value!.addEventListener('mouseup', e => {
			const { x, y } = getCoords(e)
			opts.onClickUp!(x, y)
		})

		opts?.onClickDown && canvas.value!.addEventListener('mousedown', e => {
			const { x, y } = getCoords(e)
			opts.onClickDown!(x, y)
		})

		opts?.onCursorMove && canvas.value!.addEventListener('mousemove', e => {
			const { x, y } = getCoords(e)
			opts.onCursorMove!(x, y)
		})

		opts?.onClickDown && canvas.value!.addEventListener('touchstart', e => {
			const { x, y } = getCoords(e)
			opts.onClickDown!(x, y)
		})

		opts?.onClickUp && canvas.value!.addEventListener('touchend', () => {
			opts.onClickUp!(0, 0)
		})

		opts?.onCursorMove && canvas.value!.addEventListener('touchmove', e => {
			const { x, y } = getCoords(e)
			opts.onCursorMove!(x, y)
		})
	}

	onMounted(() => {
		fixDpi()
		setEvents()
	})

	return {
		drawArrow,
		drawCircleStrokeFill,
		drawCircleStroke,
		drawCircle,
		drawLine,
		ctx,
		adjustAlpha,
		clearCanvas,
	}
}
