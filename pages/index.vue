<script setup lang="ts">
definePageMeta({
	layout: 'mobile'
})

const {
	loading,
	fetch,
	fetchMore,
	posts,
	error,
} = usePosts()

const el = ref<HTMLElement | null>(null)
useAnimateNavbar(el)

useInfiniteScroll(el, fetchMore, { distance: 80 })

await callOnce(async () => await fetch())
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
      :loading="!!loading"
      :duration="300"
    />
    <WarningBox
      :error="!!error"
      :duration="3000"
      text="Ooops! Something Went Wrong 😟"
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
