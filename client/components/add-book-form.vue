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
        <UFormGroup label="Auteurices" required>
          <USelectMenu 
            v-model="selectedAuthors" 
            :options="authorOptions" 
            multiple 
            searchable
            placeholder="Sélectionnez des auteurs" 
          />
        </UFormGroup>


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
              :maxlength="13"
            />
          </UFormGroup>
        </UTooltip>

        <!-- Type -->
        <UFormGroup label="Type" required>
          <USelectMenu 
            v-model="selectedType" 
            :options="typeOptions" 
            searchable
            placeholder="Sélectionnez le type" 
          />
        </UFormGroup>


        <!-- Thématiques -->
        <UFormGroup label="Thème" required>
          <USelectMenu 
            v-model="selectedThemes" 
            :options="themeOptions" 
            searchable
            placeholder="Sélectionnez les thèmes" 
            multiple
          />
        </UFormGroup>
        

        <!-- Edition -->
        <UFormGroup label="Maison d'édition" required>
          <USelectMenu 
            v-model="selectedEdition" 
            :options="editionOptions" 
            searchable
            placeholder="Sélectionnez une maison d'édition"  
          />
        </UFormGroup>        

        <!-- Nb exemplaires -->
        <UTooltip text="Si recommandation ne rien mettre ou 1" :popper="{ placement: 'right' }">
          <UFormGroup label="Nombre d'exemplaires">
            <UInput 
              v-model="nbAvailable"  
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


const props = defineProps({
  authors: { type: Array as () => { id: number; fullname: string }[], required: true },
  types: { type: Array as () => { id: number; type: string }[], required: true },
  themes: { type: Array as () => { id: number; theme: string }[], required: true },
  editions: { type: Array as () => { id: number; edition: string }[], required: true },
  booksIsbn: { type: Array, required: true },
});

const title = ref('');
const isbn = ref('');
const nbAvailable = ref(1);
const selectedType = ref<number>();
const selectedThemes = ref<number[]>([]);
const selectedAuthors = ref<number[]>([]);
const selectedEdition = ref<number>();
const authorNotFound = ref(false);
const authorFirstName = ref('');
const authorLastName = ref('');
const owned = ref<boolean>(false);
const toast = useToast();
const sortedAuthors = computed(() => {
  return [...props.authors].sort((a, b) => a.fullname.localeCompare(b.fullname));
});
const authorOptions = computed(() => {
  return sortedAuthors.value.map(a => ({ label: a.fullname, value: a.id }));
});
const typeOptions = computed(() => {
  return props.types.map(t => ({ label: t.type, value: t.id }));
});
const themeOptions = computed(() => {
  return props.themes.map(t => ({ label: t.theme, value: t.id }));
});
const editionOptions = computed(() => {
  return props.editions.map(e => ({ label: e.edition, value: e.id }));
});


const validateForm = (): boolean => {
  if (!title.value.trim()) {
    toast.add({ title: 'Le titre est requis.', icon: "i-heroicons-exclamation-circle", color: "red" });
    return false;
  }
  //TODO prendre en compte pas auteur
  if (!selectedAuthors.value.length && !(authorNotFound.value && authorFirstName.value && authorLastName.value))  {
    console.log(selectedAuthors.value);
    toast.add({ title: 'Veuillez sélectionner un auteur.', icon: "i-heroicons-exclamation-circle", color: "red" });
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
  nbAvailable.value = 1;
  selectedType.value = 0;
  selectedThemes.value = [];
  selectedAuthors.value = [];
  selectedEdition.value = 0;
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

  console.log("liste des isbn : ", props.booksIsbn)
  console.log("current isbn : ", isbn.value)


  if (props.booksIsbn.includes(isbn.value)) {
    toast.add({ title: 'Un livre possède déjà cet ISBN', icon: "i-heroicons-exclamation-circle", color: "red" });
    return;
  }
  

  const authorIds = [...selectedAuthors.value];
  const newAuthorId = await handleAuthorCreation();
  if (newAuthorId) {
    const newAuthor = {
      label : authorFirstName.value + " " + authorLastName.value,
      value : newAuthorId
    }
    authorIds.push(newAuthor);
    console.log("tableau de auteurs" , authorIds)
  }

  const book = {
    title: title.value,
    authors: authorIds,
    isbn: isbn.value,
    type: selectedType.value,
    themes: selectedThemes.value,
    edition: selectedEdition.value,
    owned: !owned.value,
    nbAvailable: nbAvailable.value,
  };

  try {
    const response = await fetch('http://localhost:2000/api/v1/books/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      console.log("reponse : ", response)
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

select{
  border: 1px solid #333c4c;
  border-radius: 5px;
  padding: 5px;
  background-color: #111828;
}

select[multiple] {
  height: auto;
  overflow-y: hidden;
}

select[multiple]:focus {
  height: auto;
  overflow-y: auto;
}

.new-author-fields{
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-section {
  margin-bottom: 20px;
}
</style>
