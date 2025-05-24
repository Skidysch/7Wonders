// composables/useAuth.ts
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

export function useAuth() {
  const user = ref(null)
  const isLoading = ref(true)
  const isLoggedIn = ref(false)

  onMounted(async () => {
    try {
      const res = await api.get('/auth/me')
      user.value = res.data
      isLoggedIn.value = true
    } catch (err) {
      user.value = null
      isLoggedIn.value = false
    } finally {
      isLoading.value = false
    }
  })

  async function logout() {
    try {
      await api.post('/auth/logout')
      user.value = null
      isLoggedIn.value = false
      window.location.href = '/'
    } catch (err) {
      console.log(`Error during logging out ${err}`)
      throw err
    }
  }

  return { user, isLoggedIn, isLoading, logout }
}
