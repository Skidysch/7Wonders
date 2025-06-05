<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api/axios'
import Button from '@/components/Button.vue'
import heroBg from '@/assets/hero-bg.jpg'

const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  try {
    await api.post('/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    })

    // Успешный вход — редирект на главную страницу, например
    window.location.href = '/'
  } catch (error: any) {
    errorMessage.value = error.response.data.message || 'Register failed'
  }
}
</script>
<template>
  <div class="w-full grow mb-4 py-4 rounded-xl bg-black-25 flex gap-8 overflow-hidden">
    <div class="relative w-1/2 -my-4">
      <img :src="heroBg" alt="Hero Image" class="w-full h-full object-cover" />

      <!-- Тень сверху -->
      <div
        class="absolute inset-0 shadow-[inset_60px_60px_100px_rgba(0,0,0,0.25)] pointer-events-none"
      ></div>
    </div>
    <div class="w-1/2 pr-12 flex flex-col gap-8 justify-center items-center">
      <!-- TODO: add reactive validation -->
      <form
        @submit.prevent="handleRegister"
        method="post"
        class="w-3/4 flex flex-col gap-12 justify-center items-center text-center"
      >
        <h3 class="font-semibold text-4xl text-white text-shadow-lg">Create an account</h3>
        <div class="w-full flex flex-col gap-4">
          <input
            type="username"
            v-model="username"
            placeholder="Username"
            class="w-full px-4 py-2 bg-white rounded-sm border border-secondary outline-none text-secondary font-bold"
          />
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
        <Button text="Create" type="submit" class="self-center" />
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </form>
      <div class="w-3/4 flex justify-center gap-4 text-white">
        <span>Already have an account?</span> <RouterLink to="/auth/login">Log in</RouterLink>
      </div>
    </div>
  </div>
</template>
