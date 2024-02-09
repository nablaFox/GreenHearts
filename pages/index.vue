<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'

definePageMeta({
	middleware: 'posts-data'
})

const el = ref<HTMLElement | null>(null)
useAnimateNavbar(el)

const { posts, fetchMore } = usePosts()

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
    <div class="page-size min-h-[calc(100svh-20px)] flex flex-col items-center gap-5 min-h-[100svh] overflow-y-scroll scrollbar-none pb-24">
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
          :id="post.id"
          class="w-full"
        />
      </template>
    </div>
  </main>
</template>

