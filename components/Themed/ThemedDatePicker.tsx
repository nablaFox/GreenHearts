import { View, TouchableOpacity } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { format } from 'date-fns'

import { useEffect } from 'react'

import { openDateTimePicker, onDateChange } from '@/modules/datetime-picker'

import { formatPickedDate, getIs24Hours } from '@/utils/date'

export function ThemedDatePicker({
  date,
  setDate
}: {
  date: Date
  setDate: (date: Date) => void
}) {
  const is24Hours = getIs24Hours()

  useEffect(() => {
    const subscription = onDateChange(setDate)
    return () => subscription.remove()
  }, [setDate])

  const showMode = (currentMode: 'time' | 'date') => {
    openDateTimePicker({
      mode: currentMode,
      startDate: date,
      is24Hours
    })
  }

  return (
    <View>
      <View>
        <IconButton
          icon="calendar"
          size={24}
          onPress={() => showMode('date')}
        />
        <Text>{formatPickedDate(date)}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          showMode('time')
        }}
      >
        <Text>{format(date, 'h')}</Text>
        <Text>:</Text>
        <Text>{format(date, 'm')}</Text>
        {!is24Hours && <Text>{format(date, 'a')}</Text>}
      </TouchableOpacity>
    </View>
  )
}
