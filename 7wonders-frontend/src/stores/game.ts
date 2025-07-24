// stores/game.ts
import type { GameState } from '@/types/game-interface'
import { defineStore } from 'pinia'
import { io, Socket } from 'socket.io-client'

export const useGameStore = defineStore('game', {
  state: () => ({
    socket: null as Socket | null,
    gameId: '' as string,
    gameState: null as GameState | null,
    connected: false, // Indicates if the user is connected
  }),

  actions: {
    async connectSocket(gameId: string) {
      if (this.socket) return

      const socket = io('http://localhost:3000', {
        transports: ['websocket'],
        reconnection: true,
		withCredentials: true,
      })

      this.socket = socket
      this.gameId = gameId

      socket.on('connect', () => {
        this.connected = true
        socket.emit('join_room', gameId)
        console.log(`[socket] Connected and joined room: ${gameId}`)
      })

      socket.on('disconnect', () => {
        this.connected = false
        console.warn('[socket] Disconnected from server')
      })

      socket.on('game_state', (state: GameState) => {
        console.log('[socket] Received game state', state)
        this.gameState = state
      })

      socket.on('connect_error', (err) => {
        console.error('[socket] Connection error:', err)
      })
    },

    async disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
        this.connected = false
        this.gameState = null
      }
    },

    // Example: emit a move or action later
    async submitAction(action: any) {
      if (this.socket) {
        this.socket.emit('submit_action', { gameId: this.gameId, action })
      }
    },
  },
})
