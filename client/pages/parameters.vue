<template>
    <div class="form-container">
      <h1 class="title">PARAMETRES</h1>

      <!-- Export -->
      <div class="data">
        <ExportButton />
      </div>

      <!-- TYPE -->
      <addElementsForBooks label="Ajouter un type" placeholder="Essai" elementType="type"/>

  
      <!-- THEME -->
      <addElementsForBooks label="Ajouter une thématique" placeholder="Violences" elementType="theme"/>


      <!-- EDITION -->
      <addElementsForBooks label="Ajouter une maison d'édition" placeholder="Hachette" elementType="edition"/>


      <!-- AUTEUR -->
      <addElementsForBooks label="Ajouter un·e auteur·ice" placeholder="Marie Viaire" elementType="author"/>

    </div>

    <!-- Espace developeur-->
    <div style="display: flex; flex-direction: column; margin-top: 60px; margin-bottom: 60px; align-items: center; gap: 25px;">
      <UDivider icon="i-simple-icons-devbox" />
      <p style="margin-top: 20px;">
        Merci d'utiliser ces boutons si vous êtes certain·es de ce que vous faites.
      </p>
      <div style="display: flex; gap: 15px;">
        <ImportButton/>
        <ExportButtonDev/>
      </div>
    </div>
  </template> 
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import addElementsForBooks from '~/components/add-elements-for-books.vue';

  
  </script>
  
  <style scoped>

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .styled-form {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(152, 149, 149, 0.296);
  }
  
  .styled-form .u-form-group {
    margin-bottom: 20px;
  }
  .title {
    font-size: 2.5rem;
    color: #c6c5c5;
    text-transform: uppercase;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .data {
    display: flex;
    gap: 15px ;
  }
  </style>
  