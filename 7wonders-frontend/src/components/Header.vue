<script setup lang="ts">
import logo from '@/assets/logo.png'
import Button from '@/components/Button.vue'
</script>
<template>
  <header class="w-full flex justify-between py-4 items-center">
    <div class="cursor-pointer">
      <RouterLink to="/">
        <img :src="logo" alt="7 Wonders Logo" class="h-16" />
      </RouterLink>
    </div>
    <nav>
      <ul class="flex gap-16 font-bold">
        <li><RouterLink to="/lobbies">Lobbies</RouterLink></li>
        <li><RouterLink to="/rules">Rules</RouterLink></li>
      </ul>
    </nav>
    <div>
      <RouterLink to="/signin">
        <Button text="Log in" />
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
nav ul li a {
  font-weight: 700;
}
</style>
