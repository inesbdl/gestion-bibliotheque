<script setup lang="ts">
import Header from './components/header.vue';

</script>

<template>
  <div class="page-container">
    <Header />
    <div class="body">
      <NuxtPage />
    </div>
    <UNotifications/>
  </div>
</template>

<style scoped>

.body{
  margin-top: 50px;
}
</style>
