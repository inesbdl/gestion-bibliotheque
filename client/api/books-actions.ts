export const deleteBookApi = async (id:number) => {
    try {
      const response = await fetch(`http://localhost:2000/api/v1/books/delete?idBook=${id}`, {
        method: 'DELETE', 
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: Impossible de supprimer le livre.`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la suppression du livre :", error);
      return null; 
    }
  };