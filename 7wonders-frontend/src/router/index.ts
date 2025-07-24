import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LobbiesView from '@/views/LobbiesView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LobbyView from '@/views/LobbyView.vue'
import GameRoom from '@/components/GameRoom.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/auth/login', name: 'login', component: LoginView },
  { path: '/auth/register', name: 'register', component: RegisterView },
  { path: '/lobbies', name: 'lobbies', component: LobbiesView },
  {
    path: '/lobby/:gameId',
    name: 'Lobby',
    component: LobbyView,
  },
  {
    path: '/game/:gameId',
    name: 'GameRoom',
    component: GameRoom,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
