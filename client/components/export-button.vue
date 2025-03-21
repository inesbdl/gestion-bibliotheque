<template>
  <UButton label="Exporter les livres en Excel" color="gray" @click="exportToExcel">
    <template #trailing>
      <UIcon name="i-heroicons-arrow-up-tray-20-solid" class="w-5 h-5" />
    </template>
  </UButton>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { fetchBooks } from '~/api/fetch-datas';

interface Book {
title: string;
authors: { fullname: string }[];
themes: { theme: string }[];
type: { type: string };
isbn: string;
owned: boolean;
edition: { edition: string };
}

const books = ref<Book[]>([]);

const fetchData = async () => {
try {
  books.value = await fetchBooks();
} catch (error) {
  console.error("Erreur lors du chargement des données :", error);
  books.value = [];
}
};

onMounted(() => {
fetchData();
});

const exportToExcel = () => {
  const formattedBooks = books.value.map(book => ({
    Titre: book.title,
    Auteurs: book.authors.map(a => a.fullname).join(', '),
    Thèmes: book.themes.map(t => t.theme).join(', '),
    Type: book.type?.type || '',
    ISBN: book.isbn,
    Possédé: book.owned ? 'Oui' : 'Non',
    Édition: book.edition?.edition || '',
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedBooks);

  ws['!cols'] = [
    { wch: 50 }, //titre
    { wch: 50 }, // auteur
    { wch: 30 }, // theme
    { wch: 15 }, // type
    { wch: 15 }, // isbn
    { wch: 10 }, // owned
    { wch: 30 }  // edition
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Livres');

  const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelFile], { type: 'application/octet-stream' });

  saveAs(blob, 'Bibliothèque_PF_33.xlsx');
};


</script>
