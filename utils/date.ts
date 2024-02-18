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
