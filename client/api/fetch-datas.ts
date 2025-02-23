import { ref } from 'vue';

// export const types = ref<string[]>([]);
// export const themes = ref<{ id: number; theme: string }[]>([]);
// export const authors = ref<{ id: number; name: string }[]>([]);
// export const editions = ref<{ id: number; edition: string }[]>([]);
// export const books = ref<any[]>([]);

export const fetchTypes = async () => {
  try {
    const response = await fetch("/types.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les types.`);
    }
    const data = await response.json();
    return data.types;
  } catch (error) {
    console.error("Erreur lors du chargement des types:", error);
    return []; 
  }
};

// Fonction pour récupérer les thèmes
export const fetchThemes = async () => {
  try {
    const response = await fetch("/themes.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les thèmes.`);
    }
    const data: { themes: { id: number; theme: string }[] } = await response.json();
    return data.themes; // Retourner un tableau des objets thèmes
  } catch (error) {
    console.error("Erreur lors du chargement des thèmes:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les auteurs
export const fetchAuthors = async () => {
  try {
    const response = await fetch("/authors.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les auteurices.`);
    }
    const data: { authors: { id: number; name: string }[] } = await response.json();
    return data.authors; // Retourner un tableau d'objets auteurs
  } catch (error) {
    console.error("Erreur lors du chargement des auteurices:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les éditions
export const fetchEditions = async () => {
  try {
    const response = await fetch("/editions.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les maisons d'édition.`);
    }
    const data: { editions: { id: number; edition: string }[] } = await response.json();
    return data.editions; // Retourner un tableau des objets éditions
  } catch (error) {
    console.error("Erreur lors du chargement des maisons d'édition:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};


// Fonction pour récupérer les livres
export const fetchBooks = async () => {
  try {
    const response = await fetch("/books.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les livres.`);
    }
    const data = await response.json();
    console.log(data.books[0].author)
    return data.books || []; 
  } catch (error) {
    console.error("Erreur lors du chargement des livres:", error);
    return []; 
  }
};


