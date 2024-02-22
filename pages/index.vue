<script setup lang="ts">
// TODO: change the layout based on the screen size
definePageMeta({
	layout: 'mobile'
})

const el = ref<HTMLElement | null>(null)
useAnimateNavbar(el)

const { fab } = inject('fab') as any

onMounted(() => (fab.value = false))
onUnmounted(() => (fab.value = true))
</script>

<template>
  <main
    ref="el"
    class="full-scroller"
  >
    <section
      ref="section"
      class="min-h-[calc(100svh+70px)] page-size flex flex-col gap-[45px] max-w-[600px] pb-8"
    >
      <GreeterBanner class="h-[150px]" />
      <MainMenu class="absolute right-0 mt-4" />

      <HeartStats />
      <TotalStat class="-mt-7" />

      <MetricsStat />

      <HeartsChart class="w-full h-[185px]" />
    </section>
  </main>
</template>
