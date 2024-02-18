<script setup lang="ts">
import { register } from 'swiper/element/bundle'

const swiperOpts = {
	slidesPerView: 2.5,
	spaceBetween: 20,
}

register()
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4 text-on-surface">
      <h1 class="text-xl leading-none font-extrabold">
        <TextStripe
          class="text-on-secondary-container"
          bg="bg-secondary-container"
        >
          Today's
        </TextStripe>	
        Metrics
      </h1>

      <div class="w-full">
        <div class="bg-primary-container abs-center-y w-[80%] right-[15%] h-3" />
        <SvgSquiggleThick class="w-full" />
        <TipButton
          class="absolute right-0 -bottom-[25px]"
          corner="left-bottom"
          tip="they are rough estimates calculated based on daily posts"
        />
      </div>
    </div>

    <swiper-container
      class="mt-5"
      v-bind="swiperOpts"
    >
      <swiper-slide>
        <MetricCard
          icon="ic:round-local-fire-department"
          data="83%"
          title="kcal"
        />
      </swiper-slide>

      <swiper-slide>
        <MetricCard 
          icon="ic:round-emoji-food-beverage"
          data="3"
          title="meals"
        />
      </swiper-slide>

      <swiper-slide>
        <MetricCard 
          icon="ic:round-sentiment-neutral"
          data="0.8"
          title="base"
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>
