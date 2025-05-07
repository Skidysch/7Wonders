<script setup lang="ts">
import logo from '@/assets/logo.png'
import Button from '@/components/Button.vue'
</script>
<template>
  <header class="w-full flex justify-between py-4 items-center">
    <div class="cursor-pointer">
      <img :src="logo" alt="7 Wonders Logo" class="h-16" />
    </div>
    <nav>
      <ul class="flex gap-16 font-bold">
        <li><a href="#lobbies">Lobbies</a></li>
        <li><a href="#rules">Rules</a></li>
      </ul>
    </nav>
    <div>
      <Button text="Log in" />
    </div>
  </header>
</template>

<style scoped>
nav ul li a {
  font-weight: 700;
}
</style>
