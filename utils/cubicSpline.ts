export type SplinePoint = {
	x: number
	y: number
}

function getCoefficients(
	pt1: SplinePoint, 
	pt2: SplinePoint, 
	d1: number, 
	d2: number
): number[] {
	const A = [	
		[pt1.x**3, pt1.x**2, pt1.x, 1],
		[pt2.x**3, pt2.x**2, pt2.x, 1],
		[3*pt1.x**2, 2*pt1.x, 1, 0],
		[3*pt2.x**2, 2*pt2.x, 1, 0],
	]

	const b = [
		pt1.y,
		pt2.y,
		d1,
		d2
	]	

	return solveLinearSystem(A, b)
}

export function useSpline(data: SplinePoint[], delta = 0.05) {
	const points = ref<SplinePoint[]>([])	
	const length = computed(() => points.value.length)

	function interpolate() {
		points.value = []

		for (let i = 0; i < data.length - 1; i++) {
			const isFirst = i === 0
			const prev = data[i - 1]
			const d = data[i]
			const next = data[i + 1]
			const nextNext = data[i + 2]	

			let d1: number, d2: number
			if (isFirst && nextNext) {
				d1 = 0
				d2 = (nextNext.y - d.y) - (nextNext.x - d.x)	
			} 

			else if (isFirst && !nextNext) {
				d1 = 0
				d2 = 0
			}

			else if (!nextNext) {
				d1 = (next.y - prev.y) - (next.x - prev.x)
				d2 = -3
			} else {	
				d1 = (next.y - prev.y) - (next.x - prev.x)
				d2 = (nextNext.y - d.y) - (nextNext.x - d.x)	
			}

			if (!next) return

			const p = getCoefficients(d, next, d1, d2)

			for (let t = 0; t <= 1.01; t += delta) {
				const x = d.x + t * (next.x - d.x)
				const y = p[0] * x**3 + p[1] * x**2 + p[2] * x + p[3]
				points.value.push({ x, y })
			}
		}
	}

	return {
		length,
		interpolate,
		points
	}
}
