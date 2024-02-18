<script setup lang="ts">
const { quote } = useQuotes()
</script>

<template>
  <header class="flex flex-col justify-end">
    <h3 class="font-extrabold text-xl text-on-background">
      {{ quote.head }}
    </h3>
    <h1 class="font-extrabold text-3xl text-primary">
      {{ quote.body }}
    </h1>
  </header>
</template>

