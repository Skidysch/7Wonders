<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  text?: string
  variant?: 'default' | 'filled' | 'dark'
  type?: 'button' | 'submit' | 'reset'
  icon?: string // PrimeIcons class, e.g. 'pi pi-user'
  size?: 'mini' | 'small' | 'medium' | 'large'
}>()
</script>
<template>
  <button
    v-if="variant === 'filled'"
    :type="type || 'button'"
    class="flex items-center justify-center border-2 border-primary-dark bg-secondary text-white font-bold font-cinzel text-normal rounded-lg hover:cursor-pointer hover:border-primary hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
    :class="size ==='mini' ? 'py-[2px] px-[6px] border font-cormorant text-sm leading-5' : size === 'small' ? 'py-1 px-2 border-2' : size === 'large' ? 'py-4 px-8 border-2' : 'py-2 px-4 border-2'"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
  <button
    v-else-if="variant === 'dark'"
    :type="type || 'button'"
    class="flex items-center justify-center border-primary bg-black-75 text-primary font-bold font-cinzel text-normal rounded-lg hover:cursor-pointer  hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
    :class="size ==='mini' ? 'py-[2px] px-[6px] border font-cormorant text-sm leading-5' : size === 'small' ? 'py-1 px-2 border-2' : size === 'large' ? 'py-4 px-8 border-2' : 'py-2 px-4 border-2'"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
  <button
    v-else
    :type="type || 'button'"
    class="flex items-center justify-center border-secondary text-secondary font-bold font-cinzel text-normal py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-secondary-dark hover:text-white transition duration-300 ease-in-out"
    :class="size ==='mini' ? 'py-[2px] px-[6px] border font-cormorant text-sm leading-5' : size === 'small' ? 'py-1 px-2 border-2' : size === 'large' ? 'py-4 px-8 border-2' : 'py-2 px-4 border-2'"
  >
    <i v-if="icon" :class="icon"></i>
    {{ text }}
  </button>
</template>
