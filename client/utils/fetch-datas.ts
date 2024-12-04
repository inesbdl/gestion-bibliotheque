export const fetchTypes = async (types: { value: string[] }) => {
  try {
    const response = await fetch("/types.json");
    const data = await response.json();
    types.value = data.types.map((type: { type: string }) => type.type);
  } catch (error) {
    console.error("Erreur lors du chargement des types:", error);
  }
};

export const fetchThemes = async (themes: { value: string[] }) => {
  try {
    const response = await fetch("/themes.json");
    const data = await response.json();
    themes.value = data.themes.map((theme: { theme: string }) => theme.theme);
  } catch (error) {
    console.error("Erreur lors du chargement des thèmes:", error);
  }
};

export const fetchAuthors = async (authors: { value: string[] }) => {
  try {
    const response = await fetch("/authors.json");
    const data = await response.json();
    authors.value = data.authors.map((author: { name: string }) => author.name);
  } catch (error) {
    console.error("Erreur lors du chargement des auteurices:", error);
  }
};

export const fetchEditions = async (editions: { value: string[] }) => {
  try {
    const response = await fetch("/editions.json");
    const data = await response.json();
    editions.value = data.editions.map((edition: { name: string }) => edition.name);
  } catch (error) {
    console.error("Erreur lors du chargement des maisons d'édition:", error);
  }
};

export const fetchBooks = async (books: { value: any[] }) => {
  try {
    const response = await fetch("/books.json");
    const data = await response.json();
    books.value = data.books.filter((book: any) => book.owned);
  } catch (error) {
    console.error("Erreur lors du chargement des livres:", error);
  }
};
