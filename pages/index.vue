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
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <MainHeader />
    <TransitionGroup
      name="fade"
      tag="div"
      class="page-size min-h-[calc(100svh-20px)] flex flex-col items-center gap-5 overflow-y-scroll scrollbar-none pb-24"
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
