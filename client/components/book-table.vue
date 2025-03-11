<template>
    <div >
      <div class="filters">

        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          color="white"
          placeholder="Rechercher..."
          v-model="searchQuery"
        />

        <USelectMenu 
            v-model="selectedAuthor" 
            :options="formattedAuthors" 
            multiple 
            searchable
            placeholder="Sélectionnez des auteurs" 
          />

          <USelectMenu 
          v-model="selectedType" 
          :options="formattedTypes" 
          multiple 
          searchable
          placeholder="Sélectionnez des types" 
        />

        <USelectMenu 
            v-model="selectedTheme" 
            :options="formattedThemes" 
            multiple 
            searchable
            placeholder="Sélectionnez des thématiques" 
          />

        <USelectMenu 
            v-model="selectedEdition" 
            :options="formattedEditions" 
            multiple 
            searchable
            placeholder="Sélectionnez des maisons d'édition" 
          />

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
              <td>{{ book.authors?.map(author => author.fullname).join(', ') }}</td>
              <td>{{ book.themes?.map(t => t.theme).join(', ') }}</td>
              <td>{{ book.type?.type }}</td>
              <td>{{ book.edition?.edition }}</td>
              <td>{{ book?.nbAvailable }}</td>
              <td>{{ book?.isbn }}</td>
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
  import { ref, computed, onMounted } from 'vue';
  import { fetchBooks, fetchAuthors, fetchThemes, fetchTypes, fetchEditions } from "../api/fetch-datas";
  import EditModal from "../components/edit-book-modal.vue";
  import DeleteModal from "../components/delete-book-modal.vue";
  
  export default {
    components: { EditModal, DeleteModal },
    props: {
      proposition: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const books = ref([]);
      const authors = ref([]);
      const themes = ref([]);
      const types = ref([]);
      const editions = ref([]);
      const searchQuery = ref('');
      const selectedAuthor = ref([]);
      const selectedType = ref([]);
      const selectedTheme = ref([]);
      const selectedEdition = ref([]);
      const showEditModal = ref(false);
      const showDeleteModal = ref(false);
      const selectedBook = ref(null);
      
      const formattedTypes = computed(() => {
        return types.value.map(t => ({ label: t.type, value: t.id }));
      });

      const formattedThemes = computed(() => {
        return themes.value.map(t => ({ label: t.theme, value: t.id }));
      });

      const formattedAuthors = computed(() => {
        return authors.value.map(t => ({ label: t.fullname, value: t.id }));
      });

      const formattedEditions = computed(() => {
        return editions.value.map(t => ({ label: t.edition, value: t.id }));
      });

  
      const fetchData = async () => {
        try {
          books.value = await fetchBooks() || [];
          authors.value = await fetchAuthors();
          themes.value = await fetchThemes();
          types.value = await fetchTypes();
          editions.value = await fetchEditions();
        } catch (error) {
          console.error("Erreur lors du chargement des données :", error);
          books.value = [];
        }
      };
  
      const resetFilters = () => {
        searchQuery.value = '';
        selectedAuthor.value = [];
        selectedType.value = [];
        selectedTheme.value = [];
        selectedEdition.value = [];
      };
  
      const filteredBooks = computed(() => {
          return books.value.filter(book => {
            const matchesSearchQuery = !searchQuery.value ||
              book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              book.themes.some(theme => theme.theme.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
              book.type.type.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              book.isbn.includes(searchQuery.value) ||
              (book.authors && book.authors.some(author => author.fullname.toLowerCase().includes(searchQuery.value.toLowerCase()))) ||  
              book.edition.edition.toLowerCase().includes(searchQuery.value.toLowerCase());

            const matchesAuthor = selectedAuthor.value.length === 0 || 
              book.authors.some(author => selectedAuthor.value.some(selected => selected.value === author.id));
              
              const matchesType = selectedType.value.length === 0 || 
                selectedType.value.some(selected => selected.value === book.type.id);

            const matchesTheme = selectedTheme.value.length === 0 || 
              book.themes.some(theme => selectedTheme.value.some(selected => selected.value === theme.id));


            const matchesEdition = selectedEdition.value.length === 0 || 
              selectedEdition.value.some(selected => selected.value === book.edition.id);

            return matchesSearchQuery && matchesAuthor && matchesType && matchesTheme && matchesEdition && (props.proposition ? !book.owned : book.owned);
          });
        });


      const openEditModal = (book) => {
        selectedBook.value = book;
        showEditModal.value = true;
      };
  
      const openDeleteModal = (book) => {
        selectedBook.value = book;
        showDeleteModal.value = true;
      };
  
      const updateBook = (updatedBook) => {
        showEditModal.value = false;
      };
  
      const deleteBook = () => {
        showDeleteModal.value = false;
      };
  
      onMounted(fetchData);
  
      return {
        books,
        authors,
        themes,
        types,
        editions,
        searchQuery,
        selectedAuthor,
        selectedType,
        selectedTheme,
        selectedEdition,
        showEditModal,
        showDeleteModal,
        selectedBook,
        filteredBooks,
        resetFilters,
        openEditModal,
        openDeleteModal,
        updateBook,
        deleteBook,
        formattedTypes,
        formattedEditions,
        formattedAuthors,
        formattedThemes,
      };
    }
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
