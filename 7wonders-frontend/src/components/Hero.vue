<script setup lang="ts">
import Button from '@/components/Button.vue'
import hero from '@/assets/hero-bg.jpg'
</script>
<template>
  <div class="w-full h-full flex">
    <div
      class="w-1/2 h-full flex flex-col justify-center items-center gap-10 text-center self-center"
    >
      <h1 class="font-bold text-5xl">
        Build Wonders.<br />Forge Alliances.<br />Conquer the Ages.
      </h1>
      <h4 class="text-2xl">
        Log in to track your progress,<br />join a lobby,<br />and start your next epic game!
      </h4>
      <div class="flex flex-col gap-5">
        <Button text="Log in" variant='filled' />
        <Button text="Find a lobby" />
      </div>
    </div>
    <div class="relative w-1/2">
      <img :src="hero" alt="Hero Image" class="w-full h-full object-cover" />

      <!-- Тень сверху -->
      <div
        class="absolute inset-0 shadow-[inset_60px_60px_100px_rgba(0,0,0,0.25)] pointer-events-none"
      ></div>
    </div>
  </div>
</template>
