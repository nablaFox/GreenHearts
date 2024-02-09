<script setup lang="ts">
import {useScroll} from '@vueuse/core'

definePageMeta({
	layout: false
})

const form = ref<HTMLFormElement | null>(null)
const {y} = useScroll(form)

const image = ref<File | null>(null)
const title = ref('')
const notes = ref('')

const {createPost} = usePost()

async function onSubmit() {
	await createPost({
		title: title.value,
		notes: notes.value,
		image: image.value
	})
	useRouter().push('/')
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
        @take-photo="image = $event"
      />

      <PostInput v-model="title" />
      <PostTextarea v-model="notes" />
    </main>
    <PostButton
      :disabled="!title && !image"
      @submit="onSubmit"
    />
  </form>
</template>

