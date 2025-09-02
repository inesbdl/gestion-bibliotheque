<template>
  <div class="modal">
    <p>Voulez-vous emprunter <strong>{{ book?.title }}</strong> de {{ book?.authors.map(author => author.fullname).join(', ') }} ?</p>
    <div class="buttons">
      <UButton
        color="primary"
        variant="solid"
        @click="borrowBook"
        :disabled="loading"
      >
        {{ loading ? "En cours..." : "Emprunter" }}
      </UButton>
      <UButton color="gray" variant="solid" @click="$emit('close')">Annuler</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { checkUserSession,} from "../api/users-actions"

const props = defineProps({
  book: Object,
});
const emit = defineEmits(['close', 'borrowed']);

const loading = ref(false);
const toast = useToast();

const editedBook = ref({ ...props.book });
// console.log(editedBook.value)
editedBook.value.nbShared = props.book?.nbShared + 1

const borrowBook = async () => {
    const isConnected = await checkUserSession()
  if (!isConnected) {
    toast.add({ title: "Vous devez être connecté pour emprunter un livre.", icon: "i-heroicons-exclamation-circle", color: "red" });
    emit('close');
    return;
  }

  const bookData = {
        nbShared: editedBook.value.nbShared,
    };

  loading.value = true;

  try {
    const response = await fetch(`http://localhost:2000/api/v1/users/bookUser?idBook=${props.book?.id}`, {
      method: 'POST',
      credentials: 'include', 
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Erreur lors de l\'emprunt');
    }

    const updateBook = await fetch(`http://localhost:2000/api/v1/books/update?idBook=${editedBook.value.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });
    if (!updateBook.ok) {
      throw new Error("Erreur lors de la modification du livre");
    }

    const bookUpdatedData = await fetch(`http://localhost:2000/api/v1/books/id?id=${editedBook.value.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const bookUpdated = await bookUpdatedData.json();

    toast.add({ title: "Livre emprunté avec succès !", icon: "i-heroicons-exclamation-circle", color: "green" });
    emit('borrowed', bookUpdated);
    emit('close');
  } catch (error: any) {
    toast.add({ title: "error.message", icon: "i-heroicons-exclamation-circle", color: "red" });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.modal {
  background-color: #2c2f36;
  padding: 25px 40px;
  border: 2px solid #3a3f47;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.buttons {
  display: flex;
  gap: 10px;
}
</style>
