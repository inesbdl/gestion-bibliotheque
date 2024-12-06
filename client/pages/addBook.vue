<template>
  <section >
    
    <!-- titre sous titre -->
    <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 60px; margin-top: 60px;">
      <h2 class="title">Ajouter un nouveau livre</h2>
      <h2>Vous pouvez enregistrer un livre déjà présent dans la bibliothèque ou proposer un livre à acheter. </h2>
    </div>
    <div class="container">
      <div class="form-container">
        <!-- formulaire ajout livre -->
        <addBookForm :authors="authors" :types="types" :themes="themes" :editions="editions" .booksIsbn="booksIsbn"/>
      </div>

      <!-- Colonne informations -->
      <div class="alert-container">
        <UAlert icon="i-heroicons-exclamation-triangle" color="orange" variant="subtle">
          <template #description>
            Merci de vérifier que le livre n'est pas déjà enregistré dans l'application.
          </template>
        </UAlert>

        <h2>Si l'auteur·ice n'est pas présent·e dans la liste, vous pour l'ajouter. </h2>
        <addElementsForBooks label="Ajouter un·e auteur·ice" placeholder="Marie Viaire" type="author"/>
      </div>

    </div>
  
    
  </section>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import addBookForm from '../components/add-book-form.vue'
import addElementsForBooks from '../components/add-elements-for-books.vue'


const types = ref<string[]>([]);
const themes = ref<string[]>([]);
const editions = ref<string[]>([]);
const authors = ref<string[]>([]);
const booksIsbn = ref<string[]>([]);


const fetchBooksIsbn = async () => {
  try {
    const response = await fetch('/books.json');
    const data = await response.json();
    booksIsbn.value = data.books.map((book: { isbn: string }) => book.isbn);
  } catch (error) {
    console.error('Erreur lors du chargement des isbn:', error);
  }
};



onMounted(() => {
  fetchTypes(types);
  fetchThemes(themes);
  fetchEditions(editions);
  fetchAuthors(authors);
  fetchBooksIsbn();
});
</script>


<style scoped>

.container {
  display: grid;
  grid-template-columns: 2fr 1fr; 
}

.form-container{
  width: 50%;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin-bottom: 20px;
}

.alert-container {
  width: 70%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  gap: 20px;
  text-align: center; 
}

section {
  margin-top: 40px;
}

.styled-form {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(152, 149, 149, 0.296);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  
  .styled-form .u-form-group {
    margin-bottom: 20px;
  }
</style>