export function useCanvas2d(canvas: Ref<HTMLCanvasElement | null>) {
	const ctx = computed(() => canvas.value?.getContext('2d')) 

	function initCanvas() {	
		const devicePixelRatio = window.devicePixelRatio ||  1
		canvas.value!.width = canvas.value!.offsetWidth * devicePixelRatio
		canvas.value!.height = canvas.value!.offsetHeight * devicePixelRatio
	}

	function clearCanvas() {
		const { width, height } = ctx.value!.canvas
		ctx.value!.clearRect(0, 0, width, height)
	}

	onMounted(initCanvas)	

	return {
		ctx,
		initCanvas,
		clearCanvas
	}
}
