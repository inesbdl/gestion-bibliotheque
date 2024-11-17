<template>
    <div class="form-container">

        <h2 class="title">Ajouter un nouveau livre</h2>
      <form action="" class="form">
        <!-- Titre -->
        <UTooltip text="Titre du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Titre" required>
            <UInput 
              placeholder="Sociologie des nids" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
        </UTooltip>
  
        <!-- Auteur -->
        <UTooltip text="Auteur·ice ou collectif" :popper="{ placement: 'right' }">
          <UFormGroup label="Auteur·ice" required>
            <UInput 
              placeholder="Mélanie Doisoh" 
              icon="i-heroicons-user" 
              class="input-field"
            />
          </UFormGroup>
        </UTooltip>
  
        <!-- ISBN -->
        <UTooltip text="Code composé de 13 chiffres." :popper="{ placement: 'right' }">
          <UFormGroup label="ISBN" required>
            <UInput 
              placeholder="9782070344463" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
        </UTooltip>
  
        <!-- Type -->
        <UTooltip text="Type du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Type" required>
            <UInputMenu v-model="selectedType" :options="types" class="input-field"/>
          </UFormGroup>
        </UTooltip>
  
        <!-- Thématique -->
        <UTooltip text="Thématique du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Thème" required>
            <UInputMenu v-model="selectedTheme" :options="themes" class="input-field"/>
          </UFormGroup>
        </UTooltip>
  
        <UButton 
          block 
          type="submit" 
          class="submit-button"
        >
          Ajouter le livre
        </UButton>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const types = ref<string[]>([]);
  const themes = ref<string[]>([]);
  const selectedType = ref<string>('');
  const selectedTheme = ref<string>('');
  
  const fetchTypes = async () => {
    try {
      const response = await fetch('/types.json'); 
      const data = await response.json();
      types.value = data.types.map((type: { type: string }) => type.type);
    } catch (error) {
      console.error('Erreur lors du chargement des types:', error);
    }
  };
  
  const fetchThemes = async () => {
    try {
      const response = await fetch('/themes.json'); 
      const data = await response.json();
      themes.value = data.themes.map((theme: { theme: string }) => theme.theme);
    } catch (error) {
      console.error('Erreur lors du chargement des thèmes:', error);
    }
  };
  
  onMounted(() => {
    fetchTypes();
    fetchThemes();
  });
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(176, 174, 174, 0.1);
  }
  .form-container:hover{
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
    gap: 10px;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin-bottom: 20px;
    }
  </style>
  