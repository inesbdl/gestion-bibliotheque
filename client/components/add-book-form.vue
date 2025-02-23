<template>
  <section class="form-section">
    <div class="form-container">
      <form action="" class="form" @submit.prevent="handleFormSubmit">
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
        

        <select v-model="selectedAuthors" multiple>
  <option v-for="author in authors" :key="author.id" :value="author.id">
    {{ author.name }}
  </option>
</select>


        <UTooltip text="Ajouter un auteur non trouvé" :popper="{ placement: 'right' }">
          <UCheckbox v-model="authorNotFound" label="Je ne trouve pas l'auteur" />
        </UTooltip>

        <div v-if="authorNotFound" class="new-author-fields">
          <UFormGroup label="Prénom de l'auteur" required>
            <UInput 
              v-model="authorFirstName"  
              placeholder="Prénom" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
          <UFormGroup label="Nom de l'auteur" required>
            <UInput 
              v-model="authorLastName"  
              placeholder="Nom" 
              icon="i-heroicons-pencil" 
              class="input-field"
            />
          </UFormGroup>
        </div>

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
            <USelectMenu 
              v-model="selectedType" 
              :options="types" 
              class="input-field " 
              placeholder="Sélectionner le type"
              value-field="id"   
              label-field="type"
            />
          </UFormGroup>
        </UTooltip>

        <!-- Thématiques -->
        <UTooltip text="Thématiques du livre" :popper="{ placement: 'right' }">
          <UFormGroup label="Thèmes" required>
            <USelectMenu 
              v-model="selectedThemes" 
              :options="themes" 
              multiple 
              placeholder="Sélectionner le(s) thématique(s)" 
              value-field="id"   
              label-field="theme"
            />
          </UFormGroup>
        </UTooltip>

        <!-- Edition -->
        <UTooltip text="Maison d'édition" :popper="{ placement: 'right' }">
          <UFormGroup label="Maison d'édition">
            <USelectMenu 
              v-model="selectedEdition" 
              :options="editions" 
              class="input-field" 
              placeholder="Sélectionner la maison d'édition"
              value-field="id"   
              label-field="name"
            />
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
          type="submit"
        >
          Ajouter le livre
        </UButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

function affiche(){
  console.log(selectedAuthors.value);
}

// Props
const props = defineProps({
  authors: { type: Array as () => { id: number; name: string }[], required: true },
  types: { type: Array as () => { id: number; type: string }[], required: true },
  themes: { type: Array as () => { id: number; theme: string }[], required: true },
  editions: { type: Array as () => { id: number; name: string }[], required: true },
  booksIsbn: { type: Array, required: true },
});

// Reactive Variables
const title = ref('');
const isbn = ref('');
const number = ref(1);
const selectedType = ref<number | null>(null);
const selectedThemes = ref<number[]>([]);
const selectedAuthors = ref<number[]>([]);
const selectedEdition = ref<number | null>(null);
const authorNotFound = ref(false);
const authorFirstName = ref('');
const authorLastName = ref('');
const owned = ref<boolean>(false);
const toast = useToast();

// Lifecycle
onMounted(() => {
  // Any initialization logic
});

// Methods
const validateForm = (): boolean => {
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

const resetForm = (): void => {
  title.value = '';
  isbn.value = '';
  number.value = 1;
  selectedType.value = null;
  selectedThemes.value = [];
  selectedAuthors.value = [];
  selectedEdition.value = null;
  authorNotFound.value = false;
  authorFirstName.value = '';
  authorLastName.value = '';
  owned.value = false;
};

const handleAuthorCreation = async (): Promise<number | null> => {
  if (authorNotFound.value && authorFirstName.value.trim() && authorLastName.value.trim()) {
    try {
      const response = await fetch('http://localhost:2000/api/v1/authors/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: authorFirstName.value,
          lastname: authorLastName.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'auteur');
      }

      const newAuthor = await response.json();
      return newAuthor.id;
    } catch (error: any) {
      toast.add({ title: error.message, icon: "i-heroicons-exclamation-circle", color: "red" });
      return null;
    }
  }
  return null;
};

const handleFormSubmit = async (): Promise<void> => {
  if (!validateForm()) return;

  if (props.booksIsbn.includes(isbn.value)) {
    toast.add({ title: 'Un livre possède déjà cet ISBN', icon: "i-heroicons-exclamation-circle", color: "red" });
    return;
  }
  

  const authorIds = [...selectedAuthors.value];
  const newAuthorId = await handleAuthorCreation();
  if (newAuthorId) {
    authorIds.push(newAuthorId);
  }

  const book = {
    title: title.value,
    authors: authorIds,
    isbn: isbn.value,
    type: selectedType.value,
    themes: selectedThemes.value,
    edition: selectedEdition.value,
    owned: !owned.value,
    number: number.value,
  };

  try {
    console.log(book);
    const response = await fetch('http://localhost:2000/api/v1/books/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout du livre');
    }

    toast.add({ title: 'Livre ajouté avec succès', icon: "i-heroicons-check" });
    resetForm();
  } catch (error: any) {
    toast.add({ title: error.message, icon: "i-heroicons-exclamation-circle", color: "red" });
  }
};
</script>

<style scoped>
.form-container {
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

.input-field {
  width: 100%;
}

section {
  margin-top: 40px;
}
</style>
