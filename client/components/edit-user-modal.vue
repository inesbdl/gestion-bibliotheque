<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal" @click.stop>
      <h3>Modifier mes informations</h3>
      <form @submit.prevent="submitUpdate">
        <UFormGroup label="Prénom" required>
          <UInput v-model="editedUser.firstname" />
        </UFormGroup>

        <UFormGroup label="Nom" required>
          <UInput v-model="editedUser.lastname" />
        </UFormGroup>

        <UFormGroup label="Email" required>
          <UInput v-model="editedUser.email" type="email" />
        </UFormGroup>

        <div class="buttons">
          <UButton color="primary" type="submit">Enregistrer</UButton>
          <UButton color="gray" @click="$emit('close')">Annuler</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: Object
})
const emit = defineEmits(['close', 'save'])
const toast = useToast()

const editedUser = ref({ ...props.user })

const submitUpdate = async () => {
  try {
    const userData = {
      firstname: editedUser.value.firstname,
      lastname: editedUser.value.lastname,
      email: editedUser.value.email,
    };
    const response = await fetch(`http://localhost:2000/api/v1/users/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification de l'utilisateur");
    }

    const userUpdatedData = await fetch(`http://localhost:2000/api/v1/users/currentUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: 'include'
    });
    const userUpdated = await userUpdatedData.json();
    
    toast.add({ title: "Utilisateur modifié avec succès", icon: "i-heroicons-check" });
    emit("save", userUpdated);
  } catch (error) {
    toast.add({ title: error.message, icon: "i-heroicons-exclamation-circle", color: "red" });
  }
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
}
.modal {
  background: #2c2f36;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}
.buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}
h3 {
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
