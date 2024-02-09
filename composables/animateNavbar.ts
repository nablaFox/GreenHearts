import type { Ref } from 'vue'
import { useScroll } from '@vueuse/core'

export function useAnimateNavbar(element: Ref<HTMLElement | null>) {
	const { directions } = useScroll(element)
	const { bottom: toBottom } = toRefs(directions)
	const { isNavVisible } = inject('navbar') as any

	function onScroll() {
		isNavVisible.value = !toBottom.value
	}

	onMounted(() => {
		element.value?.addEventListener('scroll', onScroll)
	})
}
