<script setup lang="ts">
const destinations = [
	{icon: 'material-symbols:favorite', href: '/', label: 'Posts'},
	{icon: 'material-symbols:auto-graph-rounded', href: '/stats', label: 'Stats'}
]

</script>

<template>
  <nav class="bg-surface text-on-surface flex-center gap-[40px] w-full pb-[16px] pt-[12px]">
    <NavSegment
      v-for="dest in destinations"
      :key="dest.icon"
      :href="dest.href"
      :icon="dest.icon"
      :label="dest.label"
      :class="{active: $route.fullPath === dest.href}"
    />
  </nav>
</template>

