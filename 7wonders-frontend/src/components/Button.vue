<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  text?: string
  variant?: 'default' | 'filled'
  type?: 'button' | 'submit' | 'reset'
  icon?: string // PrimeIcons class, e.g. 'pi pi-user'
  size?: 'small' | 'medium' | 'large'
}>()
</script>
<template>
  <button
    v-if="variant === 'filled'"
    :type="type || 'button'"
    class="flex items-center border-2 border-secondary-dark bg-secondary text-white font-bold font-cinzel text-normal rounded-lg hover:cursor-pointer hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
    :class="size === 'small' ? 'py-1 px-2' : size === 'large' ? 'py-4 px-8' : 'py-2 px-4'"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
  <button
    v-else
    :type="type || 'button'"
    class="flex items-center border-2 border-secondary text-secondary font-bold font-cinzel text-normal py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
</template>
