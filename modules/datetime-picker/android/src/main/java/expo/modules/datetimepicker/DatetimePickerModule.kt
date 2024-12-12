package expo.modules.datetimepicker

import android.app.Activity
import android.view.ViewGroup
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DatetimePickerModule : Module() {
  private var isDarkTheme: Boolean = false

  override fun definition() = ModuleDefinition {
    Name("DatetimePicker")

    Events("onSelectDate")

    Function("setUserTheme") { darkTheme: Boolean ->
      isDarkTheme = darkTheme
    }

    Function("showTimePicker") { currentDate: Long ->
      val (activity, rootView) = requireActivityAndRoot()

      val timePickerView = TimePickerView(activity, appContext).apply {
        darkTheme = isDarkTheme
        startDate = currentDate
        onDismiss = { rootView.removeView(this) }
        onTimeSelected = { sendEvent("onSelectDate", mapOf("ms" to it))}
      }

      rootView.post { rootView.addView(timePickerView) }
    }

    Function("showDatePicker") { currentDate: Long ->
      val (activity, rootView) = requireActivityAndRoot()

      val datePickerView = DatePickerView(activity, appContext).apply {
        darkTheme = isDarkTheme
        startDate = currentDate
        onDismiss = { rootView.removeView(this) }
        onDateSelected = { sendEvent("onSelectDate", mapOf("ms" to it)) }
      }

      rootView.post { rootView.addView(datePickerView) }
    }
  }

  private fun requireActivityAndRoot(): Pair<Activity, ViewGroup> {
    val activity = appContext.activityProvider?.currentActivity
      ?: error("No current activity available.")
    val rootView = activity.findViewById<ViewGroup>(android.R.id.content)
      ?: error("Could not find root view.")
    return activity to rootView
  }
}