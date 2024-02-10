<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
useAnimateNavbar(el)

const { posts, fetchMore } = usePosts()

useInfiniteScroll(
	el, 
	async () => await fetchMore(), 
	{ distance: 80}
)

const { error } = usePostsStorage()
const { loading } = usePosts()

// test by creating a post with a date 8 days in the future

const test = () => {
	const date = new Date()
	date.setDate(date.getDate() + 8)
	const post = {
		id: 'test',
		title: 'Test',
		date: date.toISOString(),
		content: 'Test'
	}

	posts.value.unshift(post)
}
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
    @click="test"
  >
    <MainHeader />
    <TransitionGroup
      name="fade"
      tag="div"
      class="page-size flex flex-col items-center gap-5 overflow-y-scroll scrollbar-none pb-24"
    >
      <div
        v-for="(post, index) in posts"
        :key="post.date"
        class="flex flex-col gap-6 w-full items-center"
      >
        <MainPost
          v-bind="post"
          :id="post.id"
          class="w-full"
        />
        <WavyDivider
          :date="post?.date"
          :prev-date="posts[index - 1]?.date"
        />
      </div>
    </TransitionGroup>

    <LoadBar
      :loading="loading"
      :duration="500"
    />
    <WarningBox
      :error="!!error"
      :duration="1500"
      text="Something Went Wrong 😟"
    />
  </main>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
