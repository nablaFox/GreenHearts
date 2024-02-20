export function solveLinearSystem(A: number[][], b: number[]) {
	let n = A.length

	for (let i = 0; i < n; i++) {
		let maxElementRow = i
		for (let j = i + 1; j < n; j++) {
			if (Math.abs(A[j][i]) > Math.abs(A[maxElementRow][i])) {
				maxElementRow = j
			}
		}

		[A[i], A[maxElementRow]] = [A[maxElementRow], A[i]];
		[b[i], b[maxElementRow]] = [b[maxElementRow], b[i]]

		for (let j = i + 1; j < n; j++) {
			let factor = A[j][i] / A[i][i]
			for (let k = i; k < n; k++) {
				A[j][k] -= A[i][k] * factor
			}
			b[j] -= b[i] * factor
		}
	}

	let x = new Array(n).fill(0)
	for (let i = n - 1; i >= 0; i--) {
		x[i] = b[i] / A[i][i]
		for (let j = i - 1; j >= 0; j--) {
			b[j] -= A[j][i] * x[i]
		}
	}

	return x
}

