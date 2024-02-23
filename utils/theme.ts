import { theme } from '#tailwind-config'

export function isVariable(key: string) {
	return key.startsWith('var(')
}

export function getThemeVar(color: string) {
	if (typeof color !== 'string') return color
	if (!isVariable(color)) return color

	color = color.replace('var(', '').replace(')', '')
	return getComputedStyle(document.documentElement).getPropertyValue(color)
}

export function getThemeColors() {
	const colors = {} as typeof theme.colors
	Object.entries(theme.colors).forEach(([key, value]) => {
		colors[key] = getThemeVar(value as string) // TODO: fix type err
	})

	return colors
}
