<template>
    <UButton label="Exporter en Excel" color="gray" @click="exportToExcel">
      <template #trailing>
        <UIcon name="i-heroicons-arrow-down-tray-20-solid" class="w-5 h-5" />
      </template>
    </UButton>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { saveAs } from 'file-saver';
  import * as XLSX from 'xlsx';
  
  const props = defineProps({
    books: {
      type: Array,
      required: true
    }
  });

  onMounted(() => {
  console.log('Livres reçus :', props.books);
});

  const exportToExcel = () => {
    // Créer un nouveau classeur Excel
    const wb = XLSX.utils.book_new();
    // Convertir les livres en une feuille de calcul
    const ws = XLSX.utils.json_to_sheet(props.books);
    
    // Ajouter la feuille au classeur
    XLSX.utils.book_append_sheet(wb, ws, 'Livres');
    
    // Exporter le fichier Excel
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelFile], { type: 'application/octet-stream' });
    
    // Enregistrer le fichier Excel
    saveAs(blob, 'Bibliothèque_PF_33.xlsx');
  };
  </script>
  