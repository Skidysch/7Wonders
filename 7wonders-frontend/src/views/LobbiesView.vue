<script setup lang="ts">
// Тут будут прогружаться список лобби
// TODO: добавить логику для получения списка лобби
import Button from '@/components/Button.vue'
const lobbies = [
  {
    id: 1,
    name: 'Lobby 1',
    numPlayers: 2,
    maxPlayers: 4,
    status: 'Waiting',
  },
  {
    id: 2,
    name: 'Lobby 2',
    numPlayers: 3,
    maxPlayers: 4,
    status: 'In Progress',
  },
  {
    id: 3,
    name: 'Lobby 3',
    numPlayers: 1,
    maxPlayers: 4,
    status: 'Waiting',
  },
]
</script>

<template>
  <section class="mt-8 flex flex-col gap-10 items center">
    <div class="py-4 px-12 rounded-xl bg-black-25 flex flex-col gap-2 items-start">
      <h3 class="font-semibold text-3xl text-white text-shadow-lg">Create game</h3>
      <form class="flex gap-2">
        <input
          type="text"
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
              v-for="(lobby, index) in lobbies"
              :key="lobby.id"
              :class="[
                'grid grid-cols-[50%_20%_30%] px-4 py-2 text-primary',
                index % 2 === 0 ? 'bg-black-75' : 'bg-black-50',
              ]"
            >
              <td>{{ lobby.name }}</td>
              <td>{{ lobby.numPlayers }}/{{ lobby.maxPlayers }}</td>
              <td>
                <Button
                  v-if="lobby.status === 'Waiting'"
                  text="Join"
                  variant="filled"
                  size="small"
                />
                <span v-else>{{ lobby.status }}</span>
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
