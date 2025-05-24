<script setup lang="ts">
import logo from '@/assets/logo.png'
import Button from '@/components/Button.vue'
import { useAuth } from '@/hooks/useAuth'

const { isLoggedIn, logout } = useAuth()
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
    <div class='flex gap-4'>
      <RouterLink v-if="!isLoggedIn" to="/auth/login">
        <Button text="Log in" />
      </RouterLink>
      <RouterLink v-else to="/profile">
        <Button text="Profile" />
      </RouterLink>
      <Button v-if='isLoggedIn' text="Log out" @click='logout' />
    </div>
  </header>
</template>

<style scoped>
nav ul li a {
  font-weight: 700;
}
</style>
