<template>
  <div class="page-container">
    <h1>Gestion de la Bibliothèque</h1>

    <BookTable
      :proposition="false"
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
  font-size: 2.5rem;
  color: #c6c5c5;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
}


</style>
