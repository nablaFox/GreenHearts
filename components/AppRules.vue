<template>
  <SvgSquiggleThick class="bg-tertiary-container absolute right-[-40px] top-24 rotate-90" />
  <div class="flex flex-col gap-2 mt-3 text-on-surface h-full pb-4">
    <h1 class="text-5xl font-black">
      Rules
    </h1>

    <div class="mt-4 flex flex-col gap-4 pr-8 pb-2">
      <AppRule title="Green">
        <p>
          Achievable trhough fitness and heroic deeds
        </p>
      </AppRule>

      <AppRule title="Blue">
        <p>
          Healthy food and/or modest quantities
        </p>
      </AppRule>

      <AppRule title="Red">
        <p>
          I don't hate you, but you could do better
        </p>
      </AppRule>
    </div>
    <SvgSquiggle class="w-3/4" />

    <div class="bg-tertiary-container text-inverse-on-tertiary-container w-24 h-10 bg-blue absolute right-0 bottom-4 rounded-sm font-black text-sm flex justify-end pt-2 pr-2">
      See more
    </div>

    <div class="absolute -left-2 bottom-6 conversion">
      <ConversionRule />
      <ConversionRule
        class="ml-4"
        negative
      />
    </div>
  </div>
</template>
