<template>
    <div class="form-container">
      <form class="styled-form">
        <UFormGroup label="Ajouter un type" required>
          <UInput placeholder="Essai" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter le type
        </UButton>
      </form>
  
      <form class="styled-form">
        <UFormGroup label="Ajouter une thématique" required>
          <UInput placeholder="Violences" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter la thématique
        </UButton>
      </form>
      <ExportButton :books="books" />
      <UButton label="Ajouter un livre" color="gray" @click="goToAddBook">
            <template #trailing>
            <UIcon name="i-heroicons-plus-20-solid" class="w-5 h-5" />
            </template>
        </UButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const router = useRouter();
    const goToAddBook = () => {
    router.push('/addBook');
    };
  
  // Définir l'interface pour les livres
  interface Book {
    title: string;
    author: string;
    theme: string;
    type: string;
    isbn: string;
    number?: number; // Optionnel si nécessaire
  }
  
  // Variable pour les livres
  const books = ref<Book[]>([]);
  
  // Charger les livres depuis le localStorage
  onMounted(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      books.value = JSON.parse(storedBooks) as Book[];
    } else {
      console.warn('Aucune donnée trouvée dans le localStorage.');
    }
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
  