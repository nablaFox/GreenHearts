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

export function getIs24Hour() {
  return true
}
