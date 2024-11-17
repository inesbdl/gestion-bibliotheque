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
  
      <!-- Bouton pour ajouter un livre -->
      <div class="add-book-btn">
        <UButton label="Ajouter un livre" color="gray" @click="goToAddBook">
            <template #trailing>
            <UIcon name="i-heroicons-plus-20-solid" class="w-5 h-5" />
            </template>
        </UButton>
        <ExportButton :books="books" />
      </div>


  
      <!-- Filtres -->
      <div class="filters">
        <select v-model="selectedAuthor">
          <option value="" disabled selected>Auteur</option>
          <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
        </select>
  
        <select v-model="selectedTheme">
          <option value="" disabled selected>Thématique</option>
          <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
        </select>
  
        <select v-model="selectedType">
          <option value="" disabled selected>Type</option>
          <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
        </select>
  
        <UButton color="primary" @click="resetFilters">
          Réinitialiser les filtres
        </UButton>
      </div>
  
      <!-- Tableau d'affichage des livres -->
      <UTable :columns="columns" :rows="filteredBooks" />


    </div>
  </template>
  
  <script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Variables pour la recherche et les filtres
const q = ref('');
const selectedAuthor = ref('');
const selectedTheme = ref('');
const selectedType = ref('');

// Données disponibles pour les filtres
const authors = ['Auteur 1', 'Auteur 2', 'Auteur 3'];
const themes = ['Thème 1', 'Thème 2', 'Thème 3'];
const types = ['Essai', 'Roman', 'Biographie'];

// Liste des livres (initialement vide)
const books = ref<any[]>([]);

// Charger les livres depuis books.json
onMounted(async () => {
      try {
        const response = await fetch('/books.json'); // Vérifie si l'URL est correcte
        if (response.ok) {
          const data = await response.json();
          // Accède à la propriété "books" du fichier JSON
          books.value = data.books || [];
        } else {
          console.error('Erreur lors du chargement des livres');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du fichier:', error);
      }
    });

// Filtrage des livres en fonction des critères
const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const searchQuery = q.value.toLowerCase();
    return (
      (!q.value || 
        book.title.toLowerCase().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery) ||
        book.theme.toLowerCase().includes(searchQuery) ||
        book.type.toLowerCase().includes(searchQuery) ||
        book.isbn.toLowerCase().includes(searchQuery)) &&
      (!selectedAuthor.value || book.author === selectedAuthor.value) &&
      (!selectedTheme.value || book.theme === selectedTheme.value) &&
      (!selectedType.value || book.type === selectedType.value)
    );
  });
});

const columns = [
  {
    key: 'title',
    label: 'Titre',
    sortable: true
  }, {
    key: 'author',
    label: 'Auteur·ice',
    sortable: true
  }, {
    key: 'theme',
    label: 'Thème',
    sortable: true,
  }, {
    key: 'type',
    label: 'Type',
    sortable: true,
  },
  {
    key : 'isbn',
    label: 'ISBN',
  },
  {
    key:'number',
    label : 'Nombre'
  }
]

// Réinitialisation des filtres
const resetFilters = () => {
  selectedAuthor.value = '';
  selectedTheme.value = '';
  selectedType.value = '';
  q.value = '';
};

// Navigation vers la page d'ajout de livre
const router = useRouter();
const goToAddBook = () => {
  router.push('/addBook');
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
    font-family: 'Arial', sans-serif;
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

    table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    font-size: 1rem;
    }

    th, td {
    padding: 12px 20px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
    }

    th {
    background-color: #f7fafc; /* Couleur d'arrière-plan pour les en-têtes */
    color: #4a5568; /* Couleur du texte pour les en-têtes */
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    }

    td {
    color: #4a5568;
    font-weight: 400;
    background-color: #f9fafb; /* Couleur de fond pour les lignes impaires */
    }

    tr:nth-child(even) td {
    background-color: #f1f5f9; /* Couleur de fond alternée pour les lignes paires */
    }

    tr:hover td {
    background-color: #e2e8f0; /* Effet au survol des lignes */
    }

    tr td:first-child {
    font-weight: 600; /* Mettre en gras la première colonne (titre du livre) */
    }

    .book-table td {
    transition: background-color 0.3s ease-in-out;
    }

    .book-table td,
    .book-table th {
    border-radius: 6px;
    }

    .book-table td:last-child {
    text-transform: uppercase; /* Mettre les ISBN en majuscules */
    }

    .book-table tr:first-child th {
    border-top: 3px solid #e2e8f0; /* Bordure supérieure de la table */
    }

    .book-table tr:last-child td {
    border-bottom: 3px solid #e2e8f0; /* Bordure inférieure de la table */
    }

    .book-table tr td,
    .book-table tr th {
    font-family: 'Roboto', sans-serif; /* Typographie moderne et lisible */
    }

  </style>
  