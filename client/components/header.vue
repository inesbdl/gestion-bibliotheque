<script setup lang="ts">
import { ref } from 'vue';

const links = ref([
  [
    {
      label: 'Accueil',
      icon: 'i-heroicons-home',
      to: '/'
    },
    {
      label: 'Ajouter un livre',
      icon: 'i-heroicons-book-open',
      to: 'addBook'
    },
  ],
  [
    {
        label: 'Paramètres',
        icon: 'i-heroicons-wrench-screwdriver',
      to: 'parameters'
    },
    {
      label: 'Guide',
      icon: 'i-heroicons-question-mark-circle',
      to:"guide"
    }
  ]
]);
</script>

<template>
    <header class="header">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #121212;
  box-shadow: 0 2px 10px rgba(128, 125, 125, 0.1); 
  z-index: 1000; 
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}


</style>
