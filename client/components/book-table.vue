<template>
    <div >
      <div class="filters">

        <input class="filter" v-model="searchQuery" placeholder="Rechercher..." @input="filterBooks" />

        <select class="filter" v-model="selectedAuthor" @change="filterBooks">
            <option value="">Tous les auteurices</option>
            <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.name }}</option>
        </select>

        <select class="filter" v-model="selectedType" @change="filterBooks">
            <option value="">Tous les types</option>
            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.type }}</option>
        </select>

        <select class="filter" v-model="selectedTheme" @change="filterBooks">
            <option value="">Toutes les thématiques</option>
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">{{ theme.theme }}</option>
        </select>

        <select class="filter" v-model="selectedEdition" @change="filterBooks">
            <option value="">Toutes les maisons d'édition</option>
            <option v-for="edition in editions" :key="edition.id" :value="edition.id">{{ edition.edition }}</option>
        </select>


        <UButton
          icon="i-heroicons-arrow-path"
          size="sm"
          color="primary"
          variant="soft"
          label="Réinitialiser"
          :trailing="false"
          @click="resetFilters"
        />

      </div>
  
      <!-- tab -->
      <div class="table-container">

        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur·ice</th>
              <th>Thématique</th>
              <th>Type</th>
              <th>Maison d'édition</th>
              <th>Nombre d'exemplaires</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in filteredBooks" :key="book.id">
              <td>{{ book.title }}</td>
              <td>{{ book.author.name }}</td>
              <td>{{ book.themes.map(t => t.theme).join(', ') }}</td>
              <td>{{ book.type.type }}</td>
              <td>{{ book.edition.edition }}</td>
              <td>{{ book.number }}</td>
              <td>{{ book.isbn }}</td>
              <td>
  
                  <UButton
                    @click="openEditModal(book)"
                    icon="i-heroicons-pencil-square"
                    size="sm"
                    color="primary"
                    square
                    variant="soft"
                  />
  
                  <UButton
                    @click="openDeleteModal(book)"
                    icon="i-heroicons-trash"
                    size="sm"
                    color="white"
                    square
                    variant="soft"
                  />
  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- modales -->
      <div class="modal" v-if="showEditModal || showDeleteModal">
        <EditModal
          v-if="showEditModal"
          :book="selectedBook"
          :authors="authors"
          :themes="themes"
          :types="types"
          :editions="editions"
          @close="showEditModal = false"
          @save="updateBook"
        />
        <DeleteModal
          v-if="showDeleteModal"
          :book="selectedBook"
          @close="showDeleteModal = false"
          @confirm="deleteBook"
        />
      </div>
    </div>
  </template>
  
  <script>
import { fetchBooks, fetchAuthors, fetchThemes, fetchTypes, fetchEditions } from "../api/fetch-datas";
import EditModal from "../components/edit-book-modal.vue";
import DeleteModal from "../components/delete-book-modal.vue";

export default {
  components: { EditModal, DeleteModal },
  data() {
    return {
      books: [], 
      authors: [],
      themes: [],
      types: [],
      editions: [],
      searchQuery: '',
      selectedType: '',
      selectedTheme: '',
      selectedEdition: '',
      selectedAuthor: '',
      showEditModal: false,
      showDeleteModal: false,
      selectedBook: null,
    };
  },
  props:{
    proposition : {
      type: Boolean,
      required: true
    }
  },
  computed: {

  filteredBooks() {
    if (!this.books) {
      return [];
    }
    return this.books.filter(book => {

        const matchesSearchQuery = !this.searchQuery ||
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.themes.some(theme => theme.theme.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        book.type.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.isbn.includes(this.searchQuery) ||
        book.author.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        book.edition.edition.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesAuthor = !this.selectedAuthor || book.author.id === this.selectedAuthor;
      
      const matchesType = !this.selectedType || book.type.id === this.selectedType;
      
      const matchesTheme = !this.selectedTheme || book.themes.some(theme => theme.id === this.selectedTheme);
      
      const matchesEdition = !this.selectedEdition || book.edition.id === this.selectedEdition;

      if (this.proposition) {
        return matchesSearchQuery && matchesAuthor && matchesType && matchesTheme && matchesEdition && book.owned === false;
      } else {
        return matchesSearchQuery && matchesAuthor && matchesType && matchesTheme && matchesEdition && book.owned == true;
      }
      // return matchesSearchQuery && matchesAuthor && matchesType && matchesTheme && matchesEdition;
    });
  }
}
,

  methods: {
    async fetchData() {
    try {
      const booksData = await fetchBooks(); 
      this.books = booksData || []; 
      this.authors = await fetchAuthors();
      this.themes = await fetchThemes();
      this.types = await fetchTypes();
      this.editions = await fetchEditions();
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
      this.books = []; 
    }
  },
  resetFilters() {
    this.searchQuery = '';
    this.selectedAuthor = '';
    this.selectedType = '';
    this.selectedTheme = '';
    this.selectedEdition = '';
  },
    filterBooks() {
    },
    openEditModal(book) {
      this.selectedBook = book;
      this.showEditModal = true;
    },
    openDeleteModal(book) {
      this.selectedBook = book;
      this.showDeleteModal = true;
    },
    toggleHET(book) {
      book.isHound = !book.isHound;
      this.$emit("update-book", book); 
    },
    updateBook(updatedBook) {
      this.$emit("update-book", updatedBook);
      this.showEditModal = false;
    },
    deleteBook() {
      this.$emit("delete-book", this.selectedBook);
      this.showDeleteModal = false;
    },
  },
  async mounted() {
    await this.fetchData();
  },
};


</script>


<style scoped>
table {
  width: 90%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
  margin: 20px auto;
}

thead th {
  color: #cdcbcb;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #4b4a4a;
}

tbody tr {
  border-bottom: 1px solid #6c6c6c; 
}

tbody tr:nth-child(even) {
  background-color: #232323; 
}

tbody tr:hover {
  background-color: #74059d3e; 
}



td {
  padding: 10px;
  text-align: left;
  color: #c1bfbf;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:nth-child(2) {
  background-color: #dc3545;
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px; 
}
.modal {
  position: fixed; 
  top: 50%;
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 1000; 
}

.filter {
  border: solid rgb(77, 73, 79) 1px;
  padding: 5px;
  border-radius: 5px;
  background-color: #2d2d2dde;
}

.filter:focus {
  outline: none;
}

.table-container {
  max-height: 400px; 
  overflow-y: auto;
}

thead {
  position: sticky;
  top: 0;
  background-color: #232323; 
  z-index: 10;
}

.table-container::-webkit-scrollbar {
  width: 8px; 
}

.table-container::-webkit-scrollbar-track {
  background: #2d2d2d; 
  border-radius: 10px; 
}

.table-container::-webkit-scrollbar-thumb {
  background: #74059d; 
  border-radius: 10px; 
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #a02fcf; 
}

</style>
