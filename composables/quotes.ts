import type { Quote } from '@/types'
import quotesData from '@/assets/quotes.json'

type Event = 'access_after_long' | 'high_score' | 'low_score' | 'generic'

export function useQuotes() {
	const { data, localData } = useUser()
	const { totalValue } = useStats()

	function getEvent() : Event {
		if (!localData.value || totalValue.value === undefined) return 'generic'

		const lastLogin = new Date(localData.value.lastLogin)
		const diff = getDiffInHours(new Date(), lastLogin)

		if (diff > 8) return 'access_after_long'

		// TODO: change this when implementing dayly score
		if (totalValue.value > 10) return 'high_score'
		if (totalValue.value > 0 && totalValue.value < 4) return 'low_score'

		return 'generic'
	}

	function shouldGetNewQuote(newEvent: Event) {
		const lastQuote = localStorage.getItem('lastQuote')
		if (!lastQuote) return true

		const { timestamp, event } = JSON.parse(lastQuote)

		if (event !== newEvent) return true

		const last = new Date(timestamp)
		if (getDiffInHours(new Date(), last) > 1) return true
	}

	function parseQuote(quote: Quote) {
		if (!data.value) return

		return {
			head: quote.head.replace('$user_name', data.value?.name),
			body: quote.body.replace('$user_name', data.value?.name)
		}
	}

	const quote = computed<Quote | undefined>(() => {	
		const event = getEvent()

		if (!shouldGetNewQuote(event)) {
			const lastQuote = JSON.parse(localStorage.getItem('lastQuote') as string)
			return lastQuote.quote
		}

		const index = Math.floor(Math.random() * quotesData[event].length)
		const _quote = quotesData[event][index] as Quote

		const quote = parseQuote(_quote)
		if (!quote) return

		localStorage.setItem('lastQuote', JSON.stringify({
			quote,
			event,
			timestamp: Date.now()
		}))

		return quote
	})

	return {
		quote
	}
}
