import DatetimePickerModule from './src/DatetimePickerModule'

export function onDateChange(listener: (date: Date) => void) {
  return DatetimePickerModule.addListener('onSelectDate', ({ ms }) => {
    ms && listener(new Date(ms))
  })
}

export function setDatetimePickerTheme(darkTheme: boolean) {
  DatetimePickerModule.setUserTheme(darkTheme)
}

export function openDateTimePicker({
  mode,
  startDate,
  is24Hours
}: {
  mode: 'time' | 'date'
  startDate: Date
  is24Hours: boolean
}) {
  const ms = startDate.getTime()

  if (mode === 'time') {
    // TODO: handle is24Hours
    DatetimePickerModule.showTimePicker(ms)
  } else {
    DatetimePickerModule.showDatePicker(ms)
  }
}
