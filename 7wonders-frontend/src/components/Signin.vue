<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api/axios'
import Button from '@/components/Button.vue'
import heroBg from '@/assets/hero-bg.jpg'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await api.post(
      '/auth/login',
      {
        email: email.value,
        password: password.value,
      },
    )

    // Успешный вход — редирект на главную страницу, например
    window.location.href = '/'
  } catch (error: any) {
    errorMessage.value = error.response.data.message || 'Login failed'
  }
}
</script>
<template>
  <div class="w-full grow mb-4 py-4 rounded-xl bg-black-25 flex gap-12 overflow-hidden">
    <div class="w-1/2 pl-12 flex flex-col gap-8 justify-center items-center">
      <!-- TODO: add reactive validation -->
      <form
        @submit.prevent="handleLogin"
        method="post"
        class="w-3/4 flex flex-col gap-8 justify-center items-center text-center"
      >
        <h3 class="font-semibold text-4xl text-white text-shadow-lg">Welcome back</h3>
        <div class="w-full flex flex-col gap-4">
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            class="w-full px-4 py-2 bg-white rounded-sm border border-secondary outline-none text-secondary font-bold"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-2 bg-white rounded-sm border border-secondary outline-none text-secondary font-bold"
          />
        </div>
        <Button text="Log in" type="submit" class="self-center" />
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
      <div class="w-3/4 flex justify-center gap-4 text-white">
        <span>Don't have an account?</span><RouterLink to='/auth/register'>Register</RouterLink>
      </div>
    </div>
    <div class="relative w-1/2 -my-4">
      <img :src="heroBg" alt="Hero Image" class="w-full h-full object-cover" />

      <!-- Тень сверху -->
      <div
        class="absolute inset-0 shadow-[inset_60px_60px_100px_rgba(0,0,0,0.25)] pointer-events-none"
      ></div>
    </div>
  </div>
</template>
