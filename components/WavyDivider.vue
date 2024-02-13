<script setup lang="ts">
import type { Timestamp } from 'firebase/firestore'

const props = defineProps<{
	date?: Timestamp
	prevDate?: Timestamp
}>()	

const isOneWeekDiff = () => {
	if (!props.prevDate || !props.date) return false
	const prev = new Date(props.prevDate.toDate())
	const current = new Date(props.date.toDate())
	return Math.abs(current.getTime() - prev.getTime()) > 604800000
}

const formattedDate = useDateFormat(props.date?.toDate(), 'D MMMM')
</script>

<template>
  <div
    v-if="isOneWeekDiff()"
    class="w-full md:w-[500px] flex-center h-1"
  >
    <SvgSquiggleThick class="bg-tertiary-container abs-center-y right-[108px]" />
    <span 
      class="font-extrabold text-sm abs-center-y right-3 text-secondary font-black"
    > 
      {{ formattedDate }} 
    </span>
  </div>
</template>

<style scoped>
path {
	stroke: var(--md-sys-color-primary);
}
</style>
