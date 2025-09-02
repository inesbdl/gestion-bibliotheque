<template>
  <div class="modal">
    <p>
      Voulez-vous rendre <strong>{{ book?.title }}</strong>
      de {{ book?.authors.map(author => author.fullname).join(', ') }} ?
    </p>
    <div class="buttons">
      <UButton
        color="red"
        variant="solid"
        @click="unborrowBook"
        :disabled="loading"
      >
        {{ loading ? "En cours..." : "Rendre" }}
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
const emit = defineEmits(['close', 'unborrowed']);

const loading = ref(false);
const toast = useToast();

const editedBook = ref({ ...props.book });
editedBook.value.nbShared = Math.max(0, props.book?.nbShared - 1);

const unborrowBook = async () => {
    const isConnected = await checkUserSession()
  if (!isConnected) {
    toast.add({
      title: "Vous devez être connecté pour rendre un livre.",
      icon: "i-heroicons-exclamation-circle",
      color: "red"
    });
    emit('close');
    return;
  }

  const bookData = {
    nbShared: editedBook.value.nbShared
  };

  loading.value = true;

  try {
    const response = await fetch(`http://localhost:2000/api/v1/users/removeBookUser?idBook=${props.book?.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erreur lors du retour");
    }

    // Update book's nbShared
    const updateBook = await fetch(`http://localhost:2000/api/v1/books/update?idBook=${editedBook.value.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    if (!updateBook.ok) {
      throw new Error("Erreur lors de la mise à jour du livre");
    }

    // Get updated book
    const bookUpdatedRes = await fetch(`http://localhost:2000/api/v1/books/id?id=${editedBook.value.id}`);
    const bookUpdated = await bookUpdatedRes.json();

    toast.add({
      title: "Livre rendu avec succès !",
      icon: "i-heroicons-check-circle",
      color: "green"
    });

    emit('unborrowed', bookUpdated);
    emit('close');
  } catch (error: any) {
    toast.add({
      title: error.message || "Erreur lors du retour",
      icon: "i-heroicons-exclamation-circle",
      color: "red"
    });
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.buttons {
  display: flex;
  gap: 10px;
}
</style>
