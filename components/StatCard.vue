<script setup lang="ts">

defineProps<{
	title?: string
	score?: number
	type?: string
}>()
</script>

<template>
  <div
    class="stat p-8 bg-surface-variant font-medium text-on-surface-variant rounded-2xl flex-center flex-col"
    :class="[type]"
  >
    <h3 class="font-bold text-lg capitalize">
      {{ title }}
    </h3>
    <h1 class="font-extrabold text-xl flex-center gap-1">
      <Icon
        name="ic:round-favorite"
      />
      {{ score }}
    </h1>
  </div>
</template>

<style scoped>
.green h1 {
	color: #3eb489;
}

.red h1 {
	color: #da7272;
}

.white h1 {
	color:  #7db6cc;
}

.nc h1 {
	color: #4169E1;
}
</style>
