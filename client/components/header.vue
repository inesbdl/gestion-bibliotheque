<script setup lang="ts">
import { ref } from 'vue';

const links = ref([
  [
    {
      label: 'Bibliothèque',
      icon: 'i-heroicons-building-library',
      to: '/'
    },
    {
      label: 'Ajouter un livre',
      icon: 'i-heroicons-book-open',
      to: 'addBook'
    },
    {
      label : 'Propositions de livres',
      icon: 'i-heroicons-shopping-bag',
      to: 'booksToBuy'
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

// mode sombre / clair
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
    <header class="header">
        <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    </header>
</template>

<!-- a mettre dans le template pour mode sombre sous la navigation -->
<!--  <ClientOnly>
          <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly> -->

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
