export function areDifferentDays(date1: Date, date2: Date) {
	return date1.getDate() !== date2.getDate()
}

export function areDifferentMonths(date1: Date, date2: Date) {
	return date1.getMonth() !== date2.getMonth()
}

export function areDifferentYears(date1: Date, date2: Date) {
	return date1.getFullYear() !== date2.getFullYear()
}

export function areDifferentHours(date1: Date, date2: Date) {
	return date1.getHours() !== date2.getHours()
}

export function areDifferentWeeks(date1: Date, date2: Date) {
	return getWeekNumber(date1) !== getWeekNumber(date2)
}

export function getDiffInSeconds(date1: Date, date2: Date) {
	return Math.abs(date1.getTime() - date2.getTime()) / 1000
}

export function getDiffInMinutes(date1: Date, date2: Date) {
	return getDiffInSeconds(date1, date2) / 60
}

export function getDiffInHours(date1: Date, date2: Date) {
	return getDiffInMinutes(date1, date2) / 60
}

export function getDiffInDays(date1: Date, date2: Date) {
	return getDiffInHours(date1, date2) / 24
}

export function getWeekNumber(date: Date) {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const dayNum = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
