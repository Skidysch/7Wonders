<script setup lang="ts">
import logo from '@/assets/logo.png'
import Button from '@/components/Button.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
if (!auth.user) {
  auth.fetchUser()
}
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
      <RouterLink v-if="!auth.isLoggedIn" to="/auth/login">
        <Button text="Log in" />
      </RouterLink>
      <RouterLink v-else to="/profile">
        <Button text="Profile" />
      </RouterLink>
      <Button v-if='auth.isLoggedIn' text="Log out" @click='auth.logout' />
    </div>
  </header>
</template>

<style scoped>
nav ul li a {
  font-weight: 700;
}
</style>
