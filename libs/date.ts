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

export function getWeek(date: Date) {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}
