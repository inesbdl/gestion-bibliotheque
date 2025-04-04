<template>
  <UButton label="Exporter la base complète en Excel" color="gray" @click="exportToExcel">
    <template #trailing>
      <UIcon name="i-heroicons-arrow-up-tray-20-solid" class="w-5 h-5" />
    </template>
  </UButton>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import {
  fetchBooks,
  fetchAuthors,
  fetchThemes,
  fetchTypes,
  fetchEditions
} from '~/api/fetch-datas';

const books = ref([]);
const authors = ref([]);
const themes = ref([]);
const types = ref([]);
const editions = ref([]);

const fetchData = async () => {
  try {
    books.value = await fetchBooks();
    authors.value = await fetchAuthors();
    themes.value = await fetchThemes();
    types.value = await fetchTypes();
    editions.value = await fetchEditions();

  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

onMounted(fetchData);

const exportToExcel = () => {

  const formattedBooks = books.value.map(book => ({
    id: book.id,
    title: book.title,
    isbn: book.isbn,
    owned: book.owned,
    nbAvailable: book.nbAvailable,
    nbShared: book.nbShared,
    typeId: book.typeId,
    editionId: book.editionId,
  }));
  const formattedTypes = types.value.map(type => ({
      id: type.id,
      type: type.type
  }));
  const formattedThemes = themes.value.map(theme => ({
      id: theme.id,
      theme: theme.theme
  }));
  const formattedEditions = editions.value.map(edition => ({
      id: edition.id,
      edition: edition.edition
  }));
  const formattedAuthors = authors.value.map(author => ({
      id: author.id,
      firstname: author.firstname,
      lastname: author.lastname,
      fullname: author.fullname
  }));

  const bookAuthorRelations = [];

  books.value.forEach(book => {
    book.authors.forEach(author => {
      bookAuthorRelations.push({
        bookId: book.id,
        authorId: author.id
      });
    });
  });

  const bookThemeRelations = [];

  books.value.forEach(book => {
    book.themes.forEach(theme => {
      bookThemeRelations.push({
        bookId: book.id,
        themeId: theme.id
      });
    });
  });


  const wb = XLSX.utils.book_new();

  // Livres
  const booksSheet = XLSX.utils.json_to_sheet(formattedBooks);
  XLSX.utils.book_append_sheet(wb, booksSheet, 'Books');
  booksSheet['!cols'] = [
    { wch: 50 }, //id
    { wch: 50 }, // titre
    { wch: 30 }, // isbn
    { wch: 15 }, // owned
    { wch: 15 }, // nbAvailable
    { wch: 10 }, // nbShared
  ];

  // Auteurs
  const authorsSheet = XLSX.utils.json_to_sheet(formattedAuthors);
  XLSX.utils.book_append_sheet(wb, authorsSheet, 'Authors');
  authorsSheet['!cols'] = [
    { wch: 50 }, //id
    { wch: 50 }, // firstname
    { wch: 50 }, // lastname
    { wch: 100 }, // fullname
  ];

  // Thèmes
  const themesSheet = XLSX.utils.json_to_sheet(formattedThemes);
  XLSX.utils.book_append_sheet(wb, themesSheet, 'Themes');
  themesSheet['!cols'] = [
    { wch: 50 }, //id
    { wch: 50 }, // theme
  ];

  // Types
  const typesSheet = XLSX.utils.json_to_sheet(formattedTypes);
  XLSX.utils.book_append_sheet(wb, typesSheet, 'Types');
  typesSheet['!cols'] = [
    { wch: 50 }, //id
    { wch: 50 }, // type
  ];
  // Editions
  const editionsSheet = XLSX.utils.json_to_sheet(formattedEditions);
  XLSX.utils.book_append_sheet(wb, editionsSheet, 'Editions');
  editionsSheet['!cols'] = [
    { wch: 50 }, //id
    { wch: 50 }, // edition
  ];

  const bookAuthor = XLSX.utils.json_to_sheet(bookAuthorRelations);
  bookAuthor['!cols'] = [
    { wch: 50 }, // bookId
    { wch: 50 }, // authorId
  ];
  XLSX.utils.book_append_sheet(wb, bookAuthor, 'Book-Author');

  const bookTheme = XLSX.utils.json_to_sheet(bookThemeRelations);
  bookTheme['!cols'] = [
    { wch: 50 }, // bookId
    { wch: 50 }, // themeId
  ];
  XLSX.utils.book_append_sheet(wb, bookTheme, 'Book-Theme');


  // Export
  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelFile], { type: 'application/octet-stream' });
  saveAs(blob, 'Export_Bibliotheque_Complet.xlsx');
};

</script>
