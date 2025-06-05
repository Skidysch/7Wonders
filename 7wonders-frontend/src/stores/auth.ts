import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import api from '@/api/axios' // adjust the import path as needed
import type { User } from '@/types/user-interface'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const isLoggedIn = ref(false)

  async function fetchUser() {
    isLoading.value = true
    try {
      const res = await api.get<User>('/auth/me')
      user.value = res.data
      isLoggedIn.value = true
    } catch (err) {
      user.value = null
      isLoggedIn.value = false
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
      user.value = null
      isLoggedIn.value = false
      window.location.href = '/'
    } catch (err) {
      console.error(`Error during logging out: ${err}`)
      throw err
    }
  }

  return {
    user,
    isLoading,
    isLoggedIn,
    fetchUser,
    logout,
  }
})
