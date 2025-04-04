<template>
  <UButton label="Importer les données" color="gray" @click="openFileInput">
    <template #trailing>
      <UIcon name="i-heroicons-arrow-down-tray-20-solid" class="w-5 h-5" />
    </template>
  </UButton>
  <input ref="fileInput" type="file" accept=".xlsx,.xls" @change="handleFileUpload" style="display: none" />
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx';
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  const toast = useToast();

  reader.onload = (e) => {
    const data = e.target?.result;
    if (data) {
      const wb = XLSX.read(data, { type: 'array' });

      const booksSheet = wb.Sheets['Books']; 
      const authorsSheet = wb.Sheets['Authors'];
      const themesSheet = wb.Sheets['Themes'];
      const typesSheet = wb.Sheets['Types'];
      const editionsSheet = wb.Sheets['Editions'];
      const bookAuthorSheet = wb.Sheets['Book-Author'];
      const bookThemeSheet = wb.Sheets['Book-Theme'];

      const booksData = XLSX.utils.sheet_to_json(booksSheet);
      const authorsData = XLSX.utils.sheet_to_json(authorsSheet);
      const themesData = XLSX.utils.sheet_to_json(themesSheet);
      const typesData = XLSX.utils.sheet_to_json(typesSheet);
      const editionsData = XLSX.utils.sheet_to_json(editionsSheet);
      const bookAuthorData = XLSX.utils.sheet_to_json(bookAuthorSheet);
      const bookThemeData = XLSX.utils.sheet_to_json(bookThemeSheet);

      //TODO Supprimer la db et la recréer

      importDataToApi(booksData, authorsData, themesData, typesData, editionsData, bookAuthorData, bookThemeData);
    }
  };

  reader.readAsArrayBuffer(file);
};
const importDataToApi = async (booksData, authorsData, themesData, typesData, editionsData, bookAuthorData, bookThemeData) => {
  try {
  
    for (const author of authorsData) {
      const authorForApi = {
        firstname: author.firstname,
        lastname: author.lastname,
      }
      
      await fetch('http://localhost:2000/api/v1/authors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorForApi),
      });
    }


    for (const theme of themesData) {
      const themeForApi = {
        theme: theme.theme
      }
      await fetch('http://localhost:2000/api/v1/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(themeForApi),
      });
    }

    for (const type of typesData) {
      const typeForApi = {
        type: type.type
      }
      await fetch('http://localhost:2000/api/v1/types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(typeForApi),
      });
    }

    for (const edition of editionsData) {
      const editionForApi = {
        edition: edition.edition
      }
      await fetch('http://localhost:2000/api/v1/editions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editionForApi),
      });
    }

    for (const book of booksData) {
      console.log(book)
      const bookForApi = {
        title: book.title,
        authors: book.authors,
        isbn: book.isbn,
        type: book.typeId,
        themes: book.themes,
        edition: book.editionId,
        owned: book.owned,
        nbAvailable: book.nbAvailable
      }
      console.log(bookForApi)
      await fetch('http://localhost:2000/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookForApi),
      });
    }

    //TODO verifier les liaisons


    //TODO si le temps ajouter une modale pour rappeler que ça écrase donc demander si on est sûr

  } catch (error) {
    console.error('Erreur lors de l\'importation des données :', error);
  }
};
</script>
