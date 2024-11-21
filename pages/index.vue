<script setup lang="ts">
import MainLayout from '~/layouts/main.vue'
const route = useRoute()
</script>

<template>
  <MainLayout>
    <div class="max-w-screen-md mx-auto p-5">
      <h1>Nuxt Routing set up successfully!</h1>
      <p>Current route: {{ route.path }}</p>
      <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
    </div>
  </MainLayout>
</template>
