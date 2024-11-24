<template>
  <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 60px; margin-top: 60px;">
    <h2 class="title">Ajouter un nouveau livre</h2>
    <h2>Vous pouvez enregistrer un livre déjà présent dans la bibliothèque ou proposer un livre à acheter. </h2>
  </div>
  
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
            <UInputMenu v-model="selectedAuthors" :options="authors" placeholder="Auteur·ice / collectif" />
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

    <!-- Colonne informations -->
    <div class="alert-container">
      <UAlert icon="i-heroicons-exclamation-triangle">
        <template #description>
          Merci de vérifier que le livre n'est pas déjà enregistré dans l'application.
        </template>
      </UAlert>
      <h2>Si l'auteur·ice n'est pas présent·e dans la liste, vous pour l'ajouter. </h2>
      <form class="styled-form">
        <UFormGroup label="Ajouter un·e auteur·ice" required>
          <UInput placeholder="Angela Davis" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
          Ajouter l'auteur
        </UButton>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const title = ref('');
const isbn = ref('');
const number = ref('');
const selectedType = ref<string>('');
const selectedThemes = ref<string[]>([]); 
const selectedAuthors = ref<string[]>([]); 
const selectedEdition = ref<string>('');
const owned = ref<boolean>(false);
const types = ref<string[]>([]);
const themes = ref<string[]>([]);
const editions = ref<string[]>([]);
const authors = ref<string[]>([]);
const booksIsbn = ref<string[]>([]);
const toast = useToast()

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

const fetchEditions = async () => {
  try {
    const response = await fetch('/editions.json');
    const data = await response.json();
    editions.value = data.editions.map((edition: { name: string }) => edition.name);
  } catch (error) {
    console.error('Erreur lors du chargement des maisons d édition:', error);
  }
};

const fetchAuthors = async () => {
  try {
    const response = await fetch('/authors.json');
    const data = await response.json();
    authors.value = data.authors.map((author: { name: string }) => author.name);
  } catch (error) {
    console.error('Erreur lors du chargement des auteurs:', error);
  }
};

const fetchBooksIsbn = async () => {
  try {
    const response = await fetch('/books.json');
    const data = await response.json();
    booksIsbn.value = data.books.map((book: { isbn: string }) => book.isbn);
  } catch (error) {
    console.error('Erreur lors du chargement des isbn:', error);
  }
};

const addBook = async (event: Event) => {
  event.preventDefault(); 
  // vérifier que l isbn n existe pas deja
  if (booksIsbn.value.includes(isbn.value)) {
    toast.add({ title: 'Un livre possède déjà cet ISBN' , icon :"i-heroicons-exclamation-circle", color: "red"});
    return;
  }

  const book = {
    title: title.value,
    author: selectedAuthors.value,
    isbn: isbn.value,
    type: selectedType.value,
    themes: selectedThemes.value,
    edition: selectedEdition.value,
    owned: owned.value ? false : true, 
    number: number.value,
  };

  // appel api
  toast.add({ title: 'Livre ajouté avec succès' , icon :"i-heroicons-check"});
  console.log(book); 
};

onMounted(() => {
  fetchTypes();
  fetchThemes();
  fetchEditions();
  fetchAuthors();
  fetchBooksIsbn();
});
</script>


<style scoped>
.form-section {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  /* gap: 40px;  */
  justify-items: center; 
}

.form-container {
  width: 50%; 
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(176, 174, 174, 0.1);
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  /* align-items: center;  */
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

.alert-container {
  width: 70%; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  gap: 20px;
  text-align: center; 
}

section {
  margin-top: 40px;
}

.styled-form {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(152, 149, 149, 0.296);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  
  .styled-form .u-form-group {
    margin-bottom: 20px;
  }
</style>