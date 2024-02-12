export interface ErrorOptions {
	timeout?: number
}

function setError<T>(name: string, data: T, options?: ErrorOptions) {
	const error = useState<T | undefined>(name)
	error.value = data
	setTimeout(() => (error.value = undefined), options?.timeout || 500)
}

export function makeError<T>(name: string) {	
	const error = useState<T | undefined>(name)	

	return { 
		error, 
		setError: (data: T) => setError<T>(name, data)
	}
}
