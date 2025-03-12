<template>
    <div v-if="isLoading" class="splash-screen">
        <h1>COUCOU</h1>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const isLoading = ref(true);
  
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false; 
    }, 2000);
  });
  </script>
  
  <style scoped>
  .splash-screen {
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #121212;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .logo {
    width: 150px;
  }
  </style>
  