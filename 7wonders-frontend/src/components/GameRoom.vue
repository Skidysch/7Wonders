<template>
  <div class="game-wrapper">
    <div id="cocos-container" style="width: 100%; height: 100vh" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRoute } from 'vue-router'

const gameStore = useGameStore()
const route = useRoute()

onMounted(async () => {
  const gameId = route.params.gameId as string
  await gameStore.connectSocket(gameId)

  //   // Provide game context for Cocos to read
  //   window.__GAME_CONTEXT__ = {
  //     playerId: gameStore.playerId,
  //     roomId: gameId,
  //     token: gameStore.token,
  //     backendUrl: import.meta.env.VITE_API_URL,
  //     gameState: gameStore.gameState,
  //   }

  // Optionally listen for updates from Cocos (e.g., submitting moves)
  //   window.addEventListener('cocos-submit-action', (event: any) => {
  //     const action = event.detail
  //     gameStore.submitAction(action)
  //   })

  // Load Cocos build
  //   const script = document.createElement('script')
  //   script.src = '/cocos-game/main.js'
  //   document.body.appendChild(script)
})

onBeforeUnmount(async () => {
 await gameStore.disconnectSocket()
})
</script>
