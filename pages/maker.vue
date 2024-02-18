<script setup lang="ts">
definePageMeta({
	middleware: [
		function(_, from) { 
			return from.path === '/posts'
		}
	]
})

const form = ref<HTMLFormElement | null>(null)
const { y } = useScroll(form, {
	behavior: 'smooth'
})

const image = ref<File | null>(null)
const title = ref('')
const notes = ref('')

const { createPost } = usePosts()

function onSubmit() {
	setTimeout(async () => {
		await createPost({
			title: title.value,
			notes: notes.value,
			image: image.value
		}).catch(console.error)

		image.value = null
		title.value = ''
		notes.value = ''
	}, 100)

	useRouter().push('/posts')
	form.value?.reset()
}

const fullScreen = ref(false)
const placeholder = `/placeholder-${Math.floor(Math.random() * 10) + 1}.png`
</script>

<template>
  <form
    id="maker"
    ref="form"
    class="maker full-scroller"
    :class="{'overflow-hidden': fullScreen}"
    @submit.prevent
  >
    <DynamicBanner
      :scroll="y"
      :max-scroll="75"
      :class="[fullScreen && 'fullScreen-1', 'transition h-[180px]']"
      go-back
    >
      <h1 class="pb-3 font-black text-4xl text-on-secondary-container will-change-[padding]">
        Add Post
      </h1>
    </DynamicBanner>
    <main class="flex flex-col gap-3 pb-[113px]">
      <PhotoFrame
        v-model="fullScreen"
        class="h-[calc(100svh-180px-48px-240px)] z-[100] transition"
        :image="placeholder"
        :scroll="y"
        :class="{ fullScreen }"
        @take-photo="image = $event"
      />

      <PostInput v-model="title" />
      <PostTextarea v-model="notes" />
    </main>
    <PostButton
      :class="[fullScreen && 'fullScreen-2', 'transition']"
      :disabled="!title && !image"
      @submit="onSubmit"
    />
  </form>
</template>

<style scoped lang="postcss">
.fullScreen {
	@apply !h-[calc(100svh-60px)] mx-4 mb-6 mt-6 rounded-3xl;
}

.transition {
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: .5s;
	transition-property: height, margin, border-radius, bottom, transform;
}

.fullScreen-1 {
	margin-top: -180px;
}

.fullScreen-2 {
	bottom: -100%;
}
</style>
