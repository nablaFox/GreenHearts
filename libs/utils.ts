import { format, isToday, isYesterday } from 'date-fns'

export function formatPickedDate(date: Date) {
  if (isToday(date)) {
    return 'Today'
  }
  if (isYesterday(date)) {
    return 'Yesterday'
  }
  return format(date, 'MMMM d')
}

export function getIs24Hours() {
  return true
}

export function getWeek(date: Date): Date {
  const copiedDate = new Date(date)
  const day = copiedDate.getDay()
  const diff = copiedDate.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(copiedDate.setDate(diff))
}

export function getWeekEnds(date: Date): [Date, Date] {
  const start = getWeek(date)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return [start, end]
}

export function kebabToCamel(str: string) {
  return str.replace(/-./g, x => x.toUpperCase()[1])
}
