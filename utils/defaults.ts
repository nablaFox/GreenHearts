type AnyObject = { [key: string]: any };

export function mergeDefaults(defaultOptions: AnyObject, userConfig: Partial<AnyObject>): void {
	for (const key in defaultOptions) {
		if (defaultOptions.hasOwnProperty(key)) {
			if (typeof defaultOptions[key] === 'object' && defaultOptions[key] !== null &&
          typeof userConfig[key] === 'object' && userConfig[key] !== null) {
				mergeDefaults(defaultOptions[key], userConfig[key])
			} else {
				if (userConfig[key] === undefined)
					userConfig[key] = defaultOptions[key]
			}
		}
	}
}
