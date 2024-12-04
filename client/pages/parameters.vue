<template>
    <div class="form-container">
      <h1>Paramètres</h1>

      <!-- TYPE -->
      <addElementsForBooks label="Ajouter un type" placeholder="Essai" type="type"/>

  
      <!-- THEME -->
      <addElementsForBooks label="Ajouter une thématique" placeholder="Violences" type="theme"/>


      <!-- EDITION -->
      <addElementsForBooks label="Ajouter une maison d'édition" placeholder="Hachette" type="edition"/>


      <!-- AUTEUR -->
      <addElementsForBooks label="Ajouter un·e auteur·ice" placeholder="Marie Viaire" type="author"/>


      <div>
        <ExportButton :books="books" />
      </div>

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import addElementsForBooks from '~/components/add-elements-for-books.vue';

  interface Book {
    title: string;
    author: string;
    theme: string;
    type: string;
    isbn: string;
    number?: number; 
    owned: boolean;
    edition: string;
  }
  
  const books = ref<Book[]>([]);
  
  onMounted(() => {
  fetchBooks(books);    
  });
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;

  }
  
  .styled-form {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(152, 149, 149, 0.296);
  }
  
  .styled-form .u-form-group {
    margin-bottom: 20px;
  }
  </style>
  