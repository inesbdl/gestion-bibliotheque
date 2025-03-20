<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>Modifier le livre</h3>
      <form @submit.prevent="handleModifyBook">
        <UFormGroup label="Titre" required>
          <UInput v-model="editedBook.title" class="input-field" />
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
          <USelectMenu v-model="editedBook.type" :options="typeOptions" placeholder="Sélectionnez le type" />
        </UFormGroup>

        <UFormGroup label="Nombre d'exemplaires">
          <UInput v-model="editedBook.nbAvailable" class="input-field" type="number" />
        </UFormGroup>

        <UFormGroup label="ISBN">
          <UInput v-model="editedBook.isbn" placeholder="9782070344463" class="input-field" :maxlength="13" />
        </UFormGroup>

        <UFormGroup label="Maison d'édition" required>
          <USelectMenu v-model="editedBook.edition" :options="editionOptions" placeholder="Sélectionnez la maison d'édition" />
        </UFormGroup>

        <UCheckbox v-model="editedBook.owned" label="Le livre a été acheté" />

        <div class="buttons">
          <UButton color="gray" variant="solid" type="submit">Enregistrer</UButton>
          <UButton color="gray" variant="solid" @click="$emit('close')">Annuler</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  book: Object,
  authors: Array,
  themes: Array,
  types: Array,
  editions: Array,
});

const emit = defineEmits(["close", "save"]);

const toast = useToast();
const editedBook = ref({ ...props.book });
const owned = ref(props.book?.owned || false);


const authorOptions = computed(() => props.authors?.map(a => ({ label: a.fullname, value: a })));
const themeOptions = computed(() => props.themes?.map(t => ({ label: t.theme, value: t })));
const typeOptions = computed(() => props.types?.map(t => ({ label: t.type, value: t })));
const editionOptions = computed(() => props.editions?.map(e => ({ label: e.edition, value: e })));

watch(() => props.book, (newBook) => {
  editedBook.value = { ...newBook };
}, { deep: true, });

const handleModifyBook = async () => {
  const bookData = {
    title: editedBook.value.title,
    authorIds: editedBook.value.authors.map(a => a.value),
    isbn: editedBook.value.isbn,
    typeId: editedBook.value.type.value,
    themeIds: editedBook.value.themes.map(t => t.value),
    editionId: editedBook.value.edition.value,
    owned: owned.value,
    nbAvailable: editedBook.value.nbAvailable,
  };

  try {
    const response = await fetch(`http://localhost:2000/api/v1/books/update?idBook=${editedBook.value.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification du livre");
    }

    toast.add({ title: "Livre modifié avec succès", icon: "i-heroicons-check" });
    emit("save", bookData);
  } catch (error: any) {
    toast.add({ title: error.message, icon: "i-heroicons-exclamation-circle", color: "red" });
  }
};
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: white;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
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
  text-align: center;
  margin-bottom: 20px;
  color: white;
}
</style>
