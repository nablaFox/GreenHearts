function easeInSine(a: number, b: number, t: number) {
	const result =  1 - Math.cos(t * Math.PI /  2)
	return a + (b - a) * result
}

function linear(a: number, b: number, t: number) {
	return a + (b - a) * t
}

function easeOutSine(a: number, b: number, t: number) {
	return a + (b - a) * Math.sin(t * Math.PI /  2)
}

function easeInOutSine(a: number, b: number, t: number) {
	return a + (b - a) * (-0.5 * (Math.cos(Math.PI * t) -  1))
}

function easeInCubic(a: number, b: number, t: number) {
	return a + (b - a) * Math.pow(t,  3)
}

function easeOutCubic(a: number, b: number, t: number) {
	return a + (b - a) * (Math.pow(t -  1,  3) +  1)
}

function easeInOutCubic(a: number, b: number, t: number) {
	return a + (b - a) * (t <  0.5 ?  4 * t * t * t : (t -  1) * (2 * t -  2) * (2 * t -  2) +  1)
}

function easeInQuart(a: number, b: number, t: number) {
	return a + (b - a) * Math.pow(t,  4)
}

function easeOutQuart(a: number, b: number, t: number) {
	return a + (b - a) * (1 - Math.pow(t -  1,  4))
}

function easeInOutQuart(a: number, b: number, t: number) {
	return a + (b - a) * (t <  0.5 ?  8 * Math.pow(t,  4) :  1 - Math.pow(-2 * t +  2,  4) /  2)
}

export default {
	linear,
	easeInSine,
	easeOutSine,
	easeInOutSine,
	easeInCubic,
	easeOutCubic,
	easeInOutCubic,
	easeInQuart,
	easeOutQuart,
	easeInOutQuart
}
