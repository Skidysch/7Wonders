<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'I am a button',
  },
  variant: {
    type: String,
    default: 'default',
  },
})
</script>
<template>
	<button
    v-if="variant === 'filled'"
    class="border-2 border-secondary-dark bg-secondary text-white font-bold font-cinzel text-normal py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
	>
    {{ text }}
</button>
<button
  v-else
  class="border-2 border-secondary text-secondary font-bold font-cinzel text-normal py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
>
  {{ text }}
</button>
</template>
