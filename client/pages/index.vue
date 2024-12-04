<template>
  <div class="home-container">
    <h1 class="title">GESTION DE LA BIBLIOTHÈQUE</h1>

    <!-- Barre de recherche -->
    <div class="search-bar">
      <UInput
        v-model="q"
        name="q"
        placeholder="Rechercher un livre, auteur·ice, thème, type, isbn..."
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            v-show="q !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="q = ''"
          />
        </template>
      </UInput>
    </div>

    <!-- Filtres -->
    <div class="filters">
      <!-- Auteur filter -->
      <UFormGroup label="Auteur·ice" >
        <USelectMenu 
          v-model="selectedAuthor" 
          :options="authors" 
          placeholder="Auteur·ice / collectif" 
          multiple 
          searchable 
        />
      </UFormGroup>

      <!-- theme -->
      <UFormGroup label="Thématique">
        <USelectMenu 
          v-model="selectedTheme" 
          :options="themes" 
          placeholder="Thématique" 
          multiple 
          searchable 
        />
      </UFormGroup>

      <!--type -->
      <UFormGroup label="Type">
        <USelectMenu 
          v-model="selectedType" 
          :options="types" 
          placeholder="Type d'ouvrage" 
          multiple 
          searchable 
        />
      </UFormGroup>

      <!-- filtre edition -->
      <UFormGroup label="Édition">
        <USelectMenu 
          v-model="selectedEdition" 
          :options="editions" 
          placeholder="Maison d'édition" 
          multiple 
          searchable 
        />
      </UFormGroup>
      <div style="display: flex; align-items: end;">
        <UButton color="gray" @click="resetFilters">
          Réinitialiser les filtres
        </UButton>
      </div>
    </div>

    <UTable :columns="columns" :rows="formattedBooks" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// formater les themes
const formattedBooks = computed(() => {
  return filteredBooks.value.map((book) => ({
    ...book,
    themes: book.themes.join(", "),
  }));
});

const q = ref("");
const selectedAuthor = ref("");
const selectedTheme = ref(""); 
const selectedType = ref("");
const selectedEdition = ref("");

const books = ref<any[]>([]);

const types = ref<string[]>([]);
const themes = ref<string[]>([]);
const editions = ref<string[]>([]);
const authors = ref<string[]>([]);

// const fetchTypes = async () => {
//   try {
//     const response = await fetch("/types.json");
//     const data = await response.json();
//     types.value = data.types.map((type: { type: string }) => type.type);
//   } catch (error) {
//     console.error("Erreur lors du chargement des types:", error);
//   }
// };

// const fetchThemes = async () => {
//   try {
//     const response = await fetch("/themes.json");
//     const data = await response.json();
//     themes.value = data.themes.map((theme: { theme: string }) => theme.theme);
//   } catch (error) {
//     console.error("Erreur lors du chargement des thèmes:", error);
//   }
// };
// const fetchAuthors = async () => {
//   try {
//     const response = await fetch("/authors.json");
//     const data = await response.json();
//     authors.value = data.authors.map((author: { name: string }) => author.name);
//   } catch (error) {
//     console.error("Erreur lors du chargement des auteurices:", error);
//   }
// };

// const fetchEditions = async () => {
//   try {
//     const response = await fetch("/editions.json");
//     const data = await response.json();
//     editions.value = data.editions.map(
//       (edition: { name: string }) => edition.name
//     );
//   } catch (error) {
//     console.error("Erreur lors du chargement des maisons d'édition:", error);
//   }
// };

// const fetchBooks = async () => {
//   try {
//     const response = await fetch("/books.json");
//     const data = await response.json();
//     books.value = data.books.filter((book: any) => book.owned);
//   } catch (error) {
//     console.error("Erreur lors du chargement des livres:", error);
//   }
// };

onMounted(() => {
  fetchTypes(types);
  fetchThemes(themes);
  fetchEditions(editions);
  fetchBooks(books);
  fetchAuthors(authors);
});

const filteredBooks = computed(() => {
  const searchQuery = q.value.toLowerCase();
  return books.value.filter((book) => {
    const matchesQuery =
      !q.value ||
      book.title.toLowerCase().includes(searchQuery) ||
      book.edition.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery) ||
      book.isbn.toLowerCase().includes(searchQuery) ||
      book.themes.some((theme: String) => theme.toLowerCase().includes(searchQuery))||
      book.type.toLowerCase().includes(searchQuery);

    const matchesAuthor =
      !selectedAuthor.value.length ||
      selectedAuthor.value.includes(book.author);

    const matchesTheme =
      !selectedTheme.value.length ||
      selectedTheme.value.some((theme: String) => book.themes.includes(theme));

    const matchesType =
      !selectedType.value.length ||
      selectedType.value.includes(book.type);

    const matchesEdition =
      !selectedEdition.value.length ||
      selectedEdition.value.includes(book.edition);

    return (
      matchesQuery && matchesAuthor && matchesTheme && matchesType && matchesEdition
    );
  });
});


const columns = [
  { key: "title", label: "Titre", sortable: true },
  { key: "author", label: "Auteur·ice", sortable: true },
  {key: "themes",label: "Thèmes",sortable: false,},
  { key: "type", label: "Type", sortable: false },
  { key: "edition", label: "Édition", sortable: false },
  { key: "isbn", label: "ISBN" },
  { key: "number", label: "Nombre d'exemplaires" },
];

const resetFilters = () => {
  q.value = "";
  selectedAuthor.value = "";
  selectedTheme.value = "";
  selectedType.value = "";
  selectedEdition.value = "";
};
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
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
  text-align: center;
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
