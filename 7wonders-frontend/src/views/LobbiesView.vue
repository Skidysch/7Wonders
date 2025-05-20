<script setup lang="ts">
import Button from '@/components/Button.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLobbiesStore } from '@/stores/lobbies'
import api from '@/api/axios'

const router = useRouter()
const lobbiesStore = useLobbiesStore()
const gameName = ref('')

onMounted(() => {
  lobbiesStore.fetchActiveLobbies()

  // Polling
  const intervalId = setInterval(() => {
    lobbiesStore.fetchActiveLobbies()
  }, 5000)

  onUnmounted(() => {
    clearInterval(intervalId)
  })
})

function joinLobby(gameId: string) {
  lobbiesStore.joinLobby(gameId)
  console.log('activeLobbies', lobbiesStore.activeLobbies)
  // Router will handle navigation when lobby is joined successfully
  // via the lobbyUpdated event in the store
}

function leaveLobby(gameId: string) {
  lobbiesStore.leaveLobby(gameId)
  // Router will handle navigation when lobby is joined successfully
  // via the lobbyUpdated event in the store
}

async function createGame() {
  await api.post('/games', {
    name: gameName.value,
  })
  gameName.value = ''
}
</script>

<template>
  <section class="mt-8 flex flex-col gap-10 items center">
    <div class="py-4 px-12 rounded-xl bg-black-25 flex flex-col gap-2 items-start">
      <h3 class="font-semibold text-3xl text-white text-shadow-lg">Create game</h3>
      <form @submit.prevent="createGame" class="flex gap-2">
        <input
          type="text"
          v-model="gameName"
          placeholder="Game name"
          class="px-3 py-1 rounded-sm border border-white outline-none text-white"
        />
        <Button icon="pi pi-arrow-right" type="submit" />
      </form>
    </div>
    <div class="py-4 px-12 rounded-xl bg-black-25 flex flex-col gap-4 items-start">
      <h3 class="font-semibold text-3xl text-white text-shadow-lg">Join game</h3>
      <!-- Table -->
      <div class="w-full overflow-auto rounded-lg">
        <table class="w-full text-sm text-left">
          <!-- Header -->
          <thead>
            <tr
              class="grid grid-cols-[50%_20%_30%] bg-secondary text-white font-semibold px-4 py-2"
            >
              <th>Game Name</th>
              <th>Number of Players</th>
              <th>Game Status</th>
            </tr>
          </thead>

          <!-- Rows -->
          <tbody>
            <tr
              v-for="(lobby, index) in lobbiesStore.activeLobbies"
              :key="lobby.id"
              :class="[
                'grid grid-cols-[50%_20%_30%] px-4 py-2 text-primary',
                index % 2 === 0 ? 'bg-black-75' : 'bg-black-50',
              ]"
            >
              <td>{{ lobby.name }}</td>
              <td>{{ lobby.currentPlayers }}/{{ lobby.maxPlayers }}</td>
              <td>
                <Button
                  v-if="lobby.status === 'WAITING'"
                  text="Join"
                  variant="filled"
                  size="small"
                  @click="joinLobby(lobby.id)"
                />
                <span v-else>{{ lobby.status }}</span>
                <!--  FIXME: this button is for testing, delete later, when configure routing after join to lobby -->
                <Button text="Leave" variant="filled" size="small" @click="leaveLobby(lobby.id)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
table tbody tr td {
  align-content: center;
}
</style>
