<template>
    <div class="form-container">
      <h1>Paramètres</h1>

      <!-- TYPE -->
      <form class="styled-form">
        <UFormGroup label="Ajouter un type" required>
          <UInput placeholder="Essai" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter le type
        </UButton>
      </form>
  
      <!-- THEME -->
      <form class="styled-form">
        <UFormGroup label="Ajouter une thématique" required>
          <UInput placeholder="Violences" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter la thématique
        </UButton>
      </form>

      <!-- EDITION -->
      <form class="styled-form">
        <UFormGroup label="Ajouter une maison d\'édition'" required>
          <UInput placeholder="Folio" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter la thématique
        </UButton>
      </form>

      <!-- AUTEUR -->
      <form class="styled-form">
        <UFormGroup label="Ajouter un·e auteur·ice" required>
          <UInput placeholder="Angela Davis" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter l'auteur
        </UButton>
      </form>

      <div>
        <ExportButton :books="books" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';

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

  const fetchBooks = async () => {
  try {
      const response = await fetch('/books.json');
      if (response.ok) {
        const data = await response.json();
        books.value = data.books || [];
      } else {
        console.error('Erreur lors du chargement des livres');
      }
    }

  catch (error) {
    console.error('Erreur lors de la récupération des livres depuis le localStorage:', error);
  }
};
  
  onMounted(() => {
  fetchBooks();    
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
  