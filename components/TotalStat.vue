<script setup lang="ts">
const { total } = useStats()
</script>

<template>
  <div>
    <div class="bg-secondary-container absolute w-[95%] h-[60px] left-2 top-2" />
    <div class="flex justify-between font-black flex px-3 py-1 bg-primary-container rounded-xl w-[95%]">
      <div class="text-on-primary-container flex-center gap-1 p-2 text-3xl">
        {{ total }}
        <Icon
          name="ic:round-favorite"
          size="30"
        />
      </div>

      <h1 class="text-2xl text-on-primary-container">
        Totals
      </h1>
    </div>
  </div>
</template>
