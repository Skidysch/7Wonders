<script setup lang="ts">
import Button from '@/components/Button.vue'
import heroBg from '@/assets/hero-bg.jpg'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
if (!auth.user) {
  auth.fetchUser()
}
</script>
<template>
  <div class="w-full h-full flex grow">
    <div
      class="w-1/2 h-full flex flex-col justify-center items-center gap-10 text-center self-center"
    >
      <h1 class="font-bold text-5xl">
        Build Wonders.<br />Forge Alliances.<br />Conquer the Ages.
      </h1>
      <h4 class="text-2xl">
        Log in to track your progress,<br />join a lobby,<br />and start your next epic game!
      </h4>
      <div class="flex flex-col gap-5 items-center">
        <RouterLink v-if='!auth.isLoggedIn' to="/auth/login">
          <Button text="Log in" variant="filled" />
        </RouterLink>
        <RouterLink to="/lobbies">
          <Button text="Find a lobby" />
        </RouterLink>
      </div>
    </div>
    <div class="relative w-1/2">
      <img :src="heroBg" alt="Hero Image" class="w-full h-full object-cover" />

      <!-- Тень сверху -->
      <div
        class="absolute inset-0 shadow-[inset_60px_60px_100px_rgba(0,0,0,0.25)] pointer-events-none"
      ></div>
    </div>
  </div>
</template>
