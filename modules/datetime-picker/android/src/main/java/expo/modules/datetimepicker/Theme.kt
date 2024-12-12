package expo.modules.datetimepicker

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

@Composable
fun AppTheme(
    darkTheme: Boolean? = false,
    content: @Composable () -> Unit
) {
    // TODO: config plugin to specify a .json file with the colors

    val lightColorScheme = lightColorScheme(
        primary = Color(0xFF006B5E),
        secondary = Color(0xFFB90C55),
        tertiary = Color(0xFF446179)
    )

    val darkColorScheme = darkColorScheme(
        primary = Color(0xFF55DBC6)   ,
        secondary = Color(0xFFFFB1C2),
        background = Color(0xFFACCAE5),
    )

    val colors = if (darkTheme == true) darkColorScheme else lightColorScheme

    MaterialTheme(
        colorScheme = colors,
        content = content
    )
}