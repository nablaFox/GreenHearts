<script setup lang="ts">
import { useSwipe } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const { direction, lengthY } = useSwipe(el)

const opened = defineModel<boolean>()

watch(
	() => (direction.value === 'down' && -lengthY.value > 150),
	() => opened.value = false
)
</script>

<template>
  <Teleport
    to="body"
    class="absolute top-0 left-0"
  >
    <Transition>
      <div
        v-if="opened"
        class="absolute w-full h-full top-0 left-0 flex flex-col justify-end"
      >
        <div class="curtain absolute w-full h-full top-0 left-0 -z-1 bg-black opacity-[30%]" />
        <main
          ref="el"
          class="min-h-[500px] bg-surface w-[98%] mx-auto rounded-t-3xl px-8 pt-7 pb-5 overflow-hidden"
        >
          <div class="w-20 h-5 top-0 abs-center-x flex-center">
            <div class="bg-on-surface w-8 h-2 rounded-full" />
          </div>
          <slot />
        </main>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="postcss">
.v-enter-active,
.v-leave-active {
	transition-duration: .3s;
}

.v-enter-from,
.v-leave-to {
	.curtain {
		opacity: 0;
	}

	main {
		transform: translateY(100%);
	}	
}

.curtain {
	transition: opacity 0.3s ease-in-out;
}

main {
	transition: transform 0.3s ease-in-out;
}
</style>
