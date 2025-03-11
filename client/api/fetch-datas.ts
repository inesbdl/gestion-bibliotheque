import { ref } from 'vue';

export const fetchTypes = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/types/");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les types.`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des types:", error);
    return []; 
  }
};

// Fonction pour récupérer les thèmes
export const fetchThemes = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/themes/");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les thèmes.`);
    }
    const data: { themes: { id: number; theme: string }[] } = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des thèmes:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les auteurs
export const fetchAuthors = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/authors/");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les auteurices.`);
    }
    const data: { authors: { id: number; fullname: string }[] } = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des auteurices:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Fonction pour récupérer les éditions
export const fetchEditions = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/editions/");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les maisons d'édition.`);
    }
    const data: { editions: { id: number; edition: string }[] } = await response.json();
    return data; // Retourner un tableau des objets éditions
  } catch (error) {
    console.error("Erreur lors du chargement des maisons d'édition:", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};


// Fonction pour récupérer les livres
export const fetchBooks = async () => {
  try {
    const response = await fetch("http://localhost:2000/api/v1/books/");
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}: Impossible de charger les livres.`);
    }
    const data = await response.json();
    console.log(data.books[0].author)
    return data || []; 
  } catch (error) {
    console.error("Erreur lors du chargement des livres:", error);
    return []; 
  }
};


