<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

definePageMeta({
	middleware: 'posts'
})

const el = ref<HTMLElement | null>(null)
const { isNavVisible } = useAnimateNavbar(el)

const { posts, fetchMore } = usePost()

useInfiniteScroll(
	el, 
	async () => await fetchMore(), 
	{ distance: 80}
)
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <MainHeader />
    <div class="w-[93%] min-h-[calc(100svh-20px)] max-w-[1200px] mx-auto flex flex-col items-center gap-5 min-h-[100svh] overflow-y-scroll scrollbar-none pb-24">
      <template
        v-for="(post, index) in posts"
        :key="index"
      >
        <WavyDivider
          :date="post?.date"
          :prev-date="posts[index - 1]?.date"
        />
        <MainPost
          v-bind="post"
          class="w-full"
        />
      </template>
    </div>

    <PostsFab :is-nav-visible="isNavVisible" />
  </main>
</template>

