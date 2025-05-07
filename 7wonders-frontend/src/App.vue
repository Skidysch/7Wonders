<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <Header class="shrink-0" />
    <RouterView />
  </div>
</template>
