<script setup lang="ts">
import Button from '@/components/Button.vue'
import { onMounted, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLobbiesStore } from '@/stores/lobbies'
import Alexandria from '@/assets/factions/Alexandria.jpg'
import Babylon from '@/assets/factions/Babylon.jpg'
import Ephesus from '@/assets/factions/Ephesus.jpg'
import Giza from '@/assets/factions/Giza.jpg'
import Halikarnassus from '@/assets/factions/Halikarnassus.jpg'
import Olympia from '@/assets/factions/Olympia.jpg'
import Rhodes from '@/assets/factions/Rhodes.jpg'
import type { Faction } from '@/types/faction-enum'
import { withRetry } from '@/helpers/retryHelper'
import { useAuthStore } from '@/stores/auth'

let intervalId: ReturnType<typeof setInterval> | null = null
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.user) {
    auth.fetchUser()
  }
  try {
    await withRetry(() => lobbiesStore.fetchLobby(gameId), 3)
  } catch (error) {
    console.error('Failed to fetch lobby', error)
  }

  intervalId = setInterval(() => {
    lobbiesStore.fetchLobby(gameId)
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const route = useRoute()
const router = useRouter()
const lobbiesStore = useLobbiesStore()
const gameId = route.params.gameId as string
const lobby = computed(() => lobbiesStore.currentLobby)

const factionBackgrounds: Record<Faction, string> = {
  ALEXANDRIA: Alexandria,
  BABYLON: Babylon,
  EPHESUS: Ephesus,
  GIZA: Giza,
  HALICARNASSUS: Halikarnassus,
  OLYMPIA: Olympia,
  RHODES: Rhodes,
}

async function leaveLobby(gameId: string) {
  await lobbiesStore.leaveLobby(gameId)
  router.push('/lobbies')
}

async function startGame(gameId: string) {
  await lobbiesStore.startGame(gameId)
  router.push(`/game/${gameId}`)
}
</script>

<template>
  <section class="mt-8 gap-12 grid grid-cols-[2fr_1fr] grid-rows-[auto_auto]">
    <div class="p-8 rounded-xl bg-black-25">
      <div class="w-full h-full flex">
        <div
          v-for="player in lobby?.players"
          :key="player.userId"
          class="w-full h-full rounded relative overflow-hidden"
        >
          <!-- Фон -->
          <img
            :src="factionBackgrounds[player.faction as Faction]"
            alt="Faction background"
            class="h-full w-full object-cover"
          />

          <!-- Верхняя тень с именем -->
          <div class="absolute top-0 left-0 w-full z-10 pt-2 text-center text-white font-medium">
            {{ player.username }}
          </div>

          <!-- Нижняя тень с нацией -->
          <div class="absolute bottom-0 left-0 w-full z-10 py-4 text-center text-white font-medium">
            {{ player.faction }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="py-8 px-12 rounded-xl bg-black-25 flex flex-col items-start gap-4 font-cormorant text-lg text-white leading-5"
    >
      <!-- TODO: add active button hovering -->
      <div class="flex flex-col gap-2">
        <p>Players</p>
        <div class="flex gap-2">
          <Button text="3" size="mini" variant="dark" />
          <Button text="4" size="mini" variant="dark" />
          <Button text="5" size="mini" variant="dark" />
          <Button text="6" size="mini" variant="dark" />
          <Button text="7" size="mini" variant="dark" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p>Wonders</p>
        <div class="flex gap-2">
          <Button text="Host choice" size="mini" variant="dark" />
          <!-- <Button text="Randomize" size="mini" variant='dark' />
          <Button text="Draft mode" size="mini" variant='dark' /> -->
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p>Players position</p>
        <div class="flex gap-2">
          <Button text="Randomize" size="mini" variant="dark" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p>Game version</p>
        <div class="flex gap-2">
          <Button text="1st edition" size="mini" variant="dark" />
          <!-- <Button text="2nd edition" size="mini" variant='dark' />
          <Button text="Duel" size="mini" variant='dark' /> -->
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <p>Discard pile</p>
        <div class="flex gap-2">
          <Button text="Visible" size="mini" variant="dark" />
          <Button text="Unavailable" size="mini" variant="dark" />
        </div>
      </div>
    </div>
    <div class="px-8 py-6 rounded-xl bg-black-25 flex justify-between">
      <!-- TODO: handle redirect to game (either here or in startGame function) -->
      <!-- TODO: consider readycheck (when switching to WebSocket, because it will be tough for server to handle all readycheck taps via fetching, needs realtime and simultaneous handling) -->
      <div class="flex gap-4">
        <Button text="Start" variant="filled" size="small" @click="startGame(gameId)" />
        <!-- <Button text="Add bot" variant="filled" size="small" />
        <Button text="Delete bot" variant="filled" size="small" /> -->
      </div>
      <div class="flex gap-4">
        <Button text="Leave" variant="filled" size="small" @click="leaveLobby(gameId)" />
        <!-- TODO: add disband both here and on backend -->
        <Button
          v-if="auth.user?.id === lobby?.hostId"
          text="Disband"
          variant="filled"
          size="small"
        />
      </div>
    </div>
  </section>
</template>
