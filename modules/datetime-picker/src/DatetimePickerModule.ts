import { NativeModule, requireNativeModule } from 'expo'

export type OnSelectDatePayload = {
  ms: number
}

type DatetimePickerModuleEvents = {
  onSelectDate: (params: OnSelectDatePayload) => void
}

declare class DatetimePickerModule extends NativeModule<DatetimePickerModuleEvents> {
  showTimePicker: (initialDate: number) => void
  showDatePicker: (initialDate: number) => void
  setUserTheme: (darkTheme: boolean) => void
}

export default requireNativeModule<DatetimePickerModule>('DatetimePicker')
