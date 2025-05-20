import { defineStore } from 'pinia'
import api from '@/api/axios'

export interface GameLobbyPreview {
  id: string
  name: string
  hostName: string
  currentPlayers: number
  maxPlayers: number
  status: string
}

// REST version
export const useLobbiesStore = defineStore('lobbies', {
  state: () => ({
    activeLobbies: [] as any[],
  }),
  actions: {
    async fetchActiveLobbies() {
      console.log('Fetching Lobbies')
      const response = await api.get('/lobby/lobbies')
      this.activeLobbies = response.data
    },

    async joinLobby(gameId: string) {
      try {
        await api.post(`/lobby/${gameId}/join`)
        await this.fetchActiveLobbies()
      } catch (error) {
        console.error('Failed to join lobby', error)
      }
    },

    async leaveLobby(gameId: string) {
      try {
        await api.post(`/lobby/${gameId}/leave`)
        await this.fetchActiveLobbies()
      } catch (error) {
        console.error('Failed to leave lobby', error)
      }
    },
  },
})
