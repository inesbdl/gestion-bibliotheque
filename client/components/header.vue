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
      label: 'Guide',
      icon: 'i-heroicons-question-mark-circle',
      to:"guide"
    }
  ]
]);
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
