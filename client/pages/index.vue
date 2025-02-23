<template>
  <div class="page-container">
    <h1>Gestion de la Bibliothèque</h1>

    <BookTable
      :books="books" :proposition="false"
    />

  </div>
</template>

<script>

import BookTable from "../components/book-table.vue"
import '@fortawesome/fontawesome-free/css/all.css';

export default {
  components: {
    BookTable,
  },
  data() {
    return {
      showEditModal: false,
      selectedBook: null,
    };
  },

};
</script>

<style scoped>

.page-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
  text-align: center;
  margin-bottom: 20px;
  color: white;
}


</style>
