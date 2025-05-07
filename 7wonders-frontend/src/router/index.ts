import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LobbiesView from '@/views/LobbiesView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/lobbies', name: 'lobbies', component: LobbiesView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
