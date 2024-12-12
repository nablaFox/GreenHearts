package expo.modules.datetimepicker

import android.content.Context
import androidx.compose.ui.platform.ComposeView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class DatePickerView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    var startDate: Long = System.currentTimeMillis()
    var onDismiss: (() -> Unit)? = null
    var onDateSelected: ((Long) -> Unit)? = null
    var darkTheme: Boolean? = false

    private val composeView = ComposeView(context).apply {
        setContent {
            AppTheme(darkTheme) {
                DatePickerBridge(
                    onDateSelected = { it?.let { onDateSelected?.invoke(it) } },
                    onDismiss = { onDismiss?.invoke() },
                    startDate = startDate
                )
            }
        }
    }

    init {
        addView(composeView)
    }
}