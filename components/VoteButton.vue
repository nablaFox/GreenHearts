<script setup lang="ts">
import type { Vote } from '@/types'
import '@material/web/iconbutton/icon-button.js'

const props = defineProps<Vote>()

const emit = defineEmits<{
  (e: 'vote', vote: Vote, negative: boolean): void
}>()

const icons = {
	green: 'ic:round-favorite',
 white: 'ic:sharp-favorite',
 red: 'ic:baseline-heart-broken'
}

const btn = ref<HTMLElement | null>(null)

const icon = computed(() => icons[props.type])
const isAdmin = localStorage.getItem('admin') === 'true' ? true : false

function onClick(negative: boolean) {
	emit('vote', props, negative)
}
</script>

<template>
  <div class>
    <md-icon-button
      v-if="score || isAdmin"
      ref="btn"
      toggle="true"
      :class="[type, !isAdmin && 'pointer-events-none']"
      :selected="score"
      @click="() => onClick(!(btn as any).selected)"
    >
      <Icon
        :name="icon"
      />
    </md-icon-button>
    <span
      v-if="score && score > 1"
      class="text-xs abs-center-y left-0 font-bold z-[1] text-on-secondary-container"
    >
      {{ score }}
    </span>
  </div>
</template>

<style scoped>
md-icon-button[selected].red {
	--md-icon-button-selected-icon-color: var(--md-sys-color-error);
	--md-icon-button-selected-pressed-icon-color: var(--md-sys-color-error);
	--md-icon-button-selected-hover-icon-color: var(--md-sys-color-error);
	--md-icon-button-selected-focus-icon-color: var(--md-sys-color-error);
	--md-icon-button-selected-hover-state-layer-color: var(--md-sys-color-error);
}

md-icon-button[selected].white {
	--md-icon-button-selected-icon-color: var(--md-sys-color-background);
	--md-icon-button-selected-pressed-icon-color: var(--md-sys-color-background);
	--md-icon-button-selected-hover-icon-color: var(--md-sys-color-background);
	--md-icon-button-selected-focus-icon-color: var(--md-sys-color-background);
	--md-icon-button-selected-hover-state-layer-color: var(--md-sys-color-background);
}
</style>

