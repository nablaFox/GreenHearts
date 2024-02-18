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
    <section class="min-h-[calc(100svh+50px)] page-size flex flex-col gap-[45px] max-w-[600px] pb-8">
      <GreeterBanner class="h-[150px]" />
      <MainMenu class="absolute right-0 mt-4" />

      <HeartStats class="" />
      <TotalStat class="-mt-7" />

      <Placeholder class="h-[120px]" />

      <MetricsStat />
    </section>
  </main>
</template>
