<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
	date?: string
	prevDate?: string
}>()	

const isOneWeekDiff = () => {
	if (!props.prevDate || !props.date) return false
	const prev = new Date(props.prevDate)
	const current = new Date(props.date)
	return Math.abs(current.getTime() - prev.getTime()) > 604800000
}

const formattedDate = useDateFormat(props.date, 'D MMMM')
</script>

<template>
  <div
    v-if="isOneWeekDiff()"
    class="w-full md:w-[500px] flex-center"
  >
    <svg
      _ngcontent-kod-c25=""
      aria-hidden="true"
      width="155"
      height="9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="bg-red-100"
    >
      <path
        _ngcontent-kod-c25=""
        d="M1.5 4.5c5.067-4.667 10.133-4.667 15.2 0s10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0 10.133-4.667 15.2 0 10.133 4.667 15.2 0"
        stroke="var(--md-sys-color-primary)"
        stroke-width="2.2"
        stroke-linecap="round"
        class="ng-tns-c25-51"
      />
    </svg>
    <span 
      class="font-extrabold text-sm abs-center-y right-3 text-primary font-black"
    > 
      {{ formattedDate }} 
    </span>
  </div>
</template>

