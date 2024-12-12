package expo.modules.datetimepicker

import DatePickerDialog
import android.view.ViewGroup
import androidx.compose.ui.platform.ComposeView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DatetimePickerModule : Module() {

  override fun definition() = ModuleDefinition {
    Name("DatetimePicker")

    Constants(
      "PI" to Math.PI
    )

    Events("onSelectDate")

    Function("hello") {
      "Hello world! 👋"
    }

    Function("showTimePicker") { currentDate: Long ->


    }

    Function("showDatePicker") { currentDate: Long ->
      val currentActivity = appContext.activityProvider?.currentActivity

      currentActivity?.let { activity ->
        activity.runOnUiThread {
          val rootView = activity.findViewById<ViewGroup>(android.R.id.content)
          val composeView = ComposeView(activity).apply {
            setContent {
              DatePickerDialog(
                onDateSelected = { selectedDate ->
                  sendEvent("onSelectDate", mapOf("ms" to selectedDate))
                  rootView.removeView(this)
                },
                onDismiss = {
                  rootView.removeView(this)
                },
                currentDate = currentDate
              )
            }
          }
          rootView.addView(composeView)
        }
      }
    }
  }
}
