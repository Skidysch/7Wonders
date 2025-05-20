<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import Button from '@/components/Button.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await axios.post(
      'http://localhost:3000/api/auth/login',
      {
        email: email.value,
        password: password.value,
      },
      {
        withCredentials: true,
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
  <div
    class="w-1/2 h-1/2 py-4 px-12 rounded-xl bg-black-25 flex flex-col justify-center items-center text-center self-center"
  >
    <form @submit.prevent="handleLogin" method="post" class="flex flex-col gap-4">
      <h3 class="font-semibold text-3xl text-white text-shadow-lg">Sign in</h3>
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
      <Button text="Log in" type="submit" class="self-center" />
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
    </form>
  </div>
</template>
