<template>
  <section>
    <!-- titre sous titre -->
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 60px;
        margin-top: 60px;
      "
    >
      <h2 class="title">Ajouter un nouveau livre</h2>
      <h2>
        Vous pouvez enregistrer un livre déjà présent dans la bibliothèque ou
        proposer un livre à acheter.
      </h2>
    </div>
    <!-- Colonne informations -->
    <div class="alert-container">
      <UAlert
        icon="i-heroicons-exclamation-triangle"
        color="orange"
        variant="subtle"
      >
        <template #description>
          Merci de vérifier que le livre n'est pas déjà enregistré dans
          l'application.
        </template>
      </UAlert>

    </div>
    <div class="container">
      <div class="form-container">
        <!-- formulaire ajout livre -->
        <addBookForm
          :authors="authors"
          :types="types"
          :themes="themes"
          :editions="editions"
          :booksIsbn="booksIsbn"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import addBookForm from "../components/add-book-form.vue";
import { fetchAuthors, fetchEditions, fetchThemes, fetchTypes } from "~/api/fetch-datas";

const types = ref<{ id: number; type: string }[]>([]);
const themes = ref<{ id: number; theme: string }[]>([]);
const editions = ref<{ id: number; edition: string }[]>([]);
const authors = ref<{ id: number; fullname: string }[]>([]);

const booksIsbn = ref<string[]>([]);

const fetchBooksIsbn = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/books/");
    const data = await response.json();
    booksIsbn.value = data.map((book: { isbn: string }) => book.isbn);
  } catch (error) {
    console.error("Erreur lors du chargement des isbn:", error);
  }
};

onMounted(async () => {
  try {
    types.value = await fetchTypes();
    themes.value = await fetchThemes();
    editions.value = await fetchEditions();
    authors.value = await fetchAuthors();
    await fetchBooksIsbn();
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
});

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 2.5rem;
  color: #c6c5c5;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.alert-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
}

section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
