import DatetimePickerModule from './src/DatetimePickerModule'

export function onDateChange(listener: (date: Date) => void) {
  return DatetimePickerModule.addListener('onSelectDate', ({ ms }) => {
    ms && listener(new Date(ms))
  })
}

export function openDateTimePicker({
  mode,
  date
}: {
  mode: 'time' | 'date'
  date: Date
}) {
  const ms = date.getTime()

  if (mode === 'time') {
    DatetimePickerModule.showTimePicker(ms)
  } else {
    DatetimePickerModule.showDatePicker(ms)
  }
}
