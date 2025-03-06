<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>Modifier le livre</h3>
      <form @submit.prevent="save">

        <UFormGroup label="Titre" required>
            <UInput 
              v-model="editedBook.title"  
              class="input-field"
            />
          </UFormGroup>

        <UFormGroup label="Auteurices" required>
          <USelectMenu 
            v-model="editedBook.authors"  
            :options="authorOptions" 
            multiple 
            searchable
            placeholder="Sélectionnez des auteurs" 
          />
        </UFormGroup>

        <UFormGroup label="Thématiques" required>
          <USelectMenu 
            v-model="editedBook.themes"  
            :options="themeOptions" 
            multiple 
            placeholder="Sélectionnez les thèmes" 
          />
        </UFormGroup>

        <UFormGroup label="Type" required>
          <USelectMenu 
            v-model="editedBook.type.type" 
            :options="typeOptions"  
            placeholder="Sélectionnez le type" 
          />
        </UFormGroup>

        <UFormGroup label="Nombre d'exemplaires">
            <UInput 
              v-model="editedBook.number"  
              class="input-field"
              type="number"
            />
          </UFormGroup>

        <UFormGroup label="ISBN">
            <UInput 
              v-model="editedBook.isbn"  
              placeholder="9782070344463" 
              class="input-field"
              :maxlength="13"
            />
          </UFormGroup>

        <UFormGroup label="Maison d'édition" required>
          <USelectMenu 
            v-model="editedBook.edition.edition" 
            :options="editionOptions" 
            placeholder="Sélectionnez la maison d'édition" 
          />
        </UFormGroup>

        <UCheckbox v-model="owned" label="Le livre a été acheté" />

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
      
      selectedAuthors: this.book.authors || [],
      selectedThemes: this.book.themes || [],
    };
  },
  computed: {
    authorOptions() {
      return this.authors.map(a => ({ label: a.name, value: a }));
    },
    
    themeOptions() {
      return this.themes.map(t => ({ label: t.theme, value: t }));
    },
    
    typeOptions() {
      return this.types.map(t => ({ label: t.type, value: t }));
    },
    
    editionOptions() {
      return this.editions.map(e => ({ label: e.edition, value: e }));
    },
  },
  watch: {
    selectedAuthors(newAuthors) {
      this.editedBook.authors = newAuthors;
    },
    selectedThemes(newThemes) {
      this.editedBook.themes = newThemes;
    },
  },
  methods: {
    save() {
      this.$emit("save", this.editedBook);
    },
  },
};

const owned = ref ();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #2c2f36;
  padding: 25px 40px;
  border: 2px solid #3a3f47;
  border-radius: 10px;
  /* width: 600px; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

form{
  display: flex;
  flex-direction: column;
  gap: 10px;
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
