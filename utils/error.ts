function setError<T>(name: string, data: T) {
	const error = useState<T | undefined>(name)
	error.value = data
}

export function makeError<T>(name: string) {	
	const error = useState<T | undefined>(name)	

	return { 
		error, 
		setError: (data: T) => setError<T>(name, data)
	}
}
