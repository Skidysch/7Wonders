import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LobbiesView from '@/views/LobbiesView.vue'
import AuthView from '@/views/AuthView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/lobbies', name: 'lobbies', component: LobbiesView },
  { path: '/auth', name: 'auth', component: AuthView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
