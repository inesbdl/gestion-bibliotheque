<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>Modifier le livre</h3>
      <form @submit.prevent="save">
        <div class="form-group">
          <label>Titre :</label>
          <input v-model="editedBook.title" />
        </div>

        <div class="form-group">
          <label>Auteurice :</label>
          <select v-model="editedBook.author.id">
            <option v-for="author in authors" :key="author.id" :value="author.id">
              {{ author.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Thématiques :</label>
          <select v-model="selectedThemes" multiple>
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">
              {{ theme.theme }}
            </option>
          </select>

        </div>

        <div class="form-group">
          <label>Type :</label>
          <select v-model="editedBook.type.id">
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.type }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Nombre d'exemplaires :</label>
          <input type="number" v-model="editedBook.number" />
        </div>

        <div class="form-group">
          <label>ISBN :</label>
          <input v-model="editedBook.isbn" />
        </div>

        <div class="form-group">
          <label>Maison d'édition :</label>
          <select v-model="editedBook.edition.id">
            <option v-for="edition in editions" :key="edition.id" :value="edition.id">
              {{ edition.edition }}
            </option>
          </select>
        </div>

        <div class="buttons">
          <UButton color="gray" variant="solid" type="submit">Enregistrer</UButton>
          <UButton color="gray" variant="solid" @click="$emit('close')">Annuler</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: Object,
    authors: Array,
    themes: Array,
    types: Array,
    editions: Array,
  },
  data() {
    return {
      editedBook: { ...this.book },
      selectedThemes: this.book.themes.map((theme) => theme.id), 
    };
  },
  watch: {
    selectedThemes(newThemes) {
      this.editedBook.themes = newThemes.map((id) =>
        this.themes.find((theme) => theme.id === id)
      );
    },
  },
  methods: {
    save() {
      this.$emit("save", this.editedBook);
    },
  },
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: rgb(34, 33, 33);
  padding: 25px 40px;
  border: 2px solid rgb(53, 52, 52);
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

select[multiple] {
  height: 100px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

h3 {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Arial", sans-serif;
  text-align: center;
  margin-bottom: 20px;
  color: white;
}
</style>
