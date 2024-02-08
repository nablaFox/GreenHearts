<script setup lang="ts">
import { useScroll } from '@vueuse/core'

definePageMeta({
	layout: false
})

const form = ref<HTMLFormElement | null>(null)
const { y } = useScroll(form)

const title = ref('')
const notes = ref('')

function onSubmit() {
	form.value?.reset()
}
</script>

<template>
  <form
    ref="form"
    class="maker full-scroller"
    @submit.prevent
  >
    <DynamicBanner
      :scroll="y"
      :max-scroll="55"
      title="Add Post"
    />
    <main class="flex flex-col gap-3 pb-[113px]">
      <PhotoFrame
        class="h-[calc(100svh-180px-48px-260px)]"
        image="/test.png"
      />

      <PostInput v-model="title" />
      <PostTextarea v-model="notes" />
    </main>
    <PostButton @submit="onSubmit" />
  </form>
</template>

