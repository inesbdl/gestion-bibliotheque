<template>
    <div class="home-container">
        <h1 class="title">PROPOSITIONS DE LIVRES</h1>
    </div>
    <div style="width: 30%; display: flex; justify-content: center;  justify-self: center; margin-bottom: 40px;" >
      <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="orange"
          variant="subtle"
        >
          <template #description>
            Ces livres ne sont pas présents dans la biliothèque.
          </template>
        </UAlert>
    </div>
    <div>
      <BookTable
        :proposition="true" 
      />
    </div>
  </template>
  
  <script setup lang="ts">
  
    import { ref } from 'vue';

    const books = ref<any[]>([]);

  </script>
  
    
  <style scoped>
  
      .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      }
  
      .title {
        font-size: 2.5rem;
        color: #c6c5c5;
        text-transform: uppercase;
        margin-bottom: 20px;
      }
  
      .search-bar {
      width: 100%;
      max-width: 600px;
      margin-bottom: 20px;
      }
  
      .add-book-btn {
      margin-bottom: 20px;
      }
  
      .filters {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
      }
  
      .book-table {
      width: 100%;
      max-width: 800px;
      margin-top: 20px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
  </style>
    