<script lang="ts" setup>
interface Props {
	tip: string
	icon?: string
	corner: 'right-bottom' | 'left-bottom' | 'right-top' | 'left-top'
}

withDefaults(defineProps<Props>(), {
	icon: 'ic:round-question-mark',
	corner: 'right-bottom'
})

const el = ref<HTMLElement | null>()
const visible = ref(false)

onClickOutside(el, () => visible.value = false)
</script>

<template>
  <span
    ref="el"
    class="bg-surface-container-high rounded-full p-1 flex-center inline-flex"
    @click="visible = !visible"
  >
    <Icon
      class="text-on-surface"
      :name="icon"
      size="15"
    />
			
    <Transition name="fade">
      <div
        v-if="visible"
        class="absolute min-w-[250px] text-sm bg-surface-container-low font-semibold text-on-surface-variant max-w-[350px] z-[999] rounded-lg p-2"
        :class="corner"
      >
        {{ tip }}
      </div>

    </Transition>
  </span>
</template>

<style scoped>
.right-top,
.right-bottom {
	left: calc(100% + 5px);
	top: 10px;
}

.left-top,
.left-bottom {
	right: calc(100% + 5px);	
	top: 10px;
}

.right-top,
.left-top {
	transform: translateY(calc(-100% + 10px));
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
