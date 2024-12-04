<template>
    <section class="form-section">
    <div class="form-container">
      <form action="" class="form">
        <!-- Titre -->
        <UTooltip text="Titre du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Titre" required>
            <UInput 
              v-model="title"  
              placeholder="Sociologie des nids" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
        </UTooltip>

        <!-- Auteur -->
        <UTooltip text="Auteur·ice ou collectif" :popper="{ placement: 'right' }">
          <UFormGroup label="Auteur·ice" required>
            <USelectMenu v-model="selectedAuthors" :options="authors" placeholder="Auteur·ice / collectif" multiple searchable />
          </UFormGroup>
        </UTooltip>

        <!-- ISBN -->
        <UTooltip text="Code composé de 13 chiffres." :popper="{ placement: 'right' }">
          <UFormGroup label="ISBN">
            <UInput 
              v-model="isbn"  
              placeholder="9782070344463" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
        </UTooltip>

        <!-- Type -->
        <UTooltip text="Type du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Type" required>
            <USelectMenu v-model="selectedType" :options="types" class="input-field " placeholder="Sélectionner le type"/>
          </UFormGroup>
        </UTooltip>

        <!-- Thématiques -->
        <UTooltip text="Thématiques du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Thèmes" required>
            <USelectMenu v-model="selectedThemes" :options="themes" multiple placeholder="Sélectionner le(s) thématique(s)" />
          </UFormGroup>
        </UTooltip>

        <!-- Edition -->
        <UTooltip text="Maison d'édition" :popper="{ placement: 'right' }">
          <UFormGroup label="Maison d'édition">
            <USelectMenu v-model="selectedEdition" :options="editions" class="input-field" placeholder="Sélectionner la maison d'édition"/>
          </UFormGroup>
        </UTooltip>

        <!-- Nb exemplaires -->
        <UTooltip text="Si recommandation ne rien mettre ou 1" :popper="{ placement: 'right' }">
          <UFormGroup label="Nombre d'exemplaires">
            <UInput 
              v-model="number"  
              placeholder=" 1" 
              icon="i-heroicons-pencil" 
              class="input-field"
              type="number"
            />
          </UFormGroup>
        </UTooltip>

        <UCheckbox v-model="owned" name="owned" label="Ce livre est une proposition" />

        <UButton 
          block 
          class="submit-button"
          @click="addBook"
        >
          Ajouter le livre
        </UButton>
      </form>
    </div>

  </section>
</template>

<script setup>
    const props = defineProps({
    authors: {
      type: Array,
      required: true
    },
    types: {
      type: Array,
      required: true
    },
    themes: {
      type: Array,
      required: true
    },
    editions: {
      type: Array,
      required: true
    },
  });
</script>

<style scoped>
/* .form-section {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  justify-items: center; 
} */

.form-container {
  /* width: 50%;  */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(176, 174, 174, 0.1);
  display: flex;
  flex-direction: column;
}

.form-container:hover {
  box-shadow: #52db7b3c 0 4px 10px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.UFormGroup {
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
}

.title {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
}

/* .alert-container {
  width: 70%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  gap: 20px;
  text-align: center; 
} */

section {
  margin-top: 40px;
}

</style>