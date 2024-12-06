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

<script setup lang="ts">

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
    booksIsbn: {
      type: Array,
      required: true
    }
  });

  const title = ref('');
    const isbn = ref('');
    const number = ref('');
    const selectedType = ref<string>('');
    const selectedThemes = ref<string[]>([]); 
    const selectedAuthors = ref<string[]>([]); 
    const selectedEdition = ref<string>('');
    const owned = ref<boolean>(false);
    const toast = useToast()

    onMounted(() => {
    })
    
    const validateForm = () => {
        if (!title.value.trim()) {
            toast.add({ title: 'Le titre est requis.', icon: "i-heroicons-exclamation-circle", color: "red" });
            return false;
        }
        if (!selectedAuthors.value.length) {
            toast.add({ title: 'Veuillez sélectionner au moins un auteur.', icon: "i-heroicons-exclamation-circle", color: "red" });
            return false;
        }
        if (!selectedType.value) {
            toast.add({ title: 'Le type est obligatoire.', icon: "i-heroicons-exclamation-circle", color: "red" });
            return false;
        }
        return true;
    };
    
    
    const addBook = async (event: Event) => {
        console.log("coucou")
        console.log(props.booksIsbn)
        event.preventDefault(); 
        if (!validateForm()) return;

        if (booksIsbn.value.includes(isbn.value)) {
            toast.add({ title: 'Un livre possède déjà cet ISBN', icon: "i-heroicons-exclamation-circle", color: "red" });
            return;
        }

        const book = {
            title: title.value,
            author: selectedAuthors.value,
            isbn: isbn.value,
            type: selectedType.value,
            themes: selectedThemes.value,
            edition: selectedEdition.value,
            owned: !owned.value,
            number: number.value,
        };

        // API Call
        toast.add({ title: 'Livre ajouté avec succès', icon: "i-heroicons-check" });
        console.log(book);
};

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