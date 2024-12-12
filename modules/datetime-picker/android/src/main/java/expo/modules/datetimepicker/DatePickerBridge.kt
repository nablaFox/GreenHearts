package expo.modules.datetimepicker

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.material3.rememberDatePickerState
import java.util.Calendar

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DatePickerBridge(
    onDateSelected: (Long?) -> Unit,
    onDismiss: () -> Unit,
    startDate: Long? = null
) {
    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = startDate,
        initialDisplayMode = DisplayMode.Picker
    )

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    val adjustedDate = datePickerState.selectedDateMillis?.let { newDate ->
                        startDate?.let { preserveHoursAndMinutes(it, newDate) } ?: newDate
                    }
                    onDateSelected(adjustedDate)
                    onDismiss()
                }
            ) { Text("OK") }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Cancel") }
        }
    ) {
        DatePicker(state = datePickerState)
    }
}

fun preserveHoursAndMinutes(originalDate: Long, newDate: Long): Long {
    val cal = Calendar.getInstance()
    cal.timeInMillis = originalDate
    val hour = cal.get(Calendar.HOUR_OF_DAY)
    val minute = cal.get(Calendar.MINUTE)

    cal.timeInMillis = newDate
    cal.set(Calendar.HOUR_OF_DAY, hour)
    cal.set(Calendar.MINUTE, minute)
    cal.set(Calendar.SECOND, 0)
    cal.set(Calendar.MILLISECOND, 0)

    return cal.timeInMillis
}