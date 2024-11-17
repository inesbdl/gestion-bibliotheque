<template>
    <div class="guide-page">
      <header class="guide-header">
        <h1>Guide de l'application</h1>
        <p>Bienvenue dans l'application de gestion de bibliothèque du Planning Familial 33.</p>
      </header>
  
      <section class="guide-section">
        <h2>1. Accueil</h2>
        <p>La page d'accueil vous permet de rechercher et de filtrer les livres disponibles dans la bibliothèque du planning familial. Vous pouvez utiliser la barre de recherche pour trouver un livre par titre, auteur, type, isbn ou thématique.</p>
        <ul>
          <li><strong>Barre de recherche :</strong> Recherchez des livres par mot-clé.</li>
          <li><strong>Filtres :</strong> Affinez la recherche en filtrant par auteur, thématique et type de livre.</li>
          <li><strong>Ajouter un livre :</strong> Accédez à la page d'ajout d'un livre via le bouton dédié.</li>
        </ul>
      </section>
  
      <section class="guide-section">
        <h2>2. Ajouter un livre</h2>
        <p>Sur la page "Ajouter un livre", vous pouvez entrer toutes les informations relatives à un nouveau livre que vous souhaitez ajouter à la bibliothèque.</p>
        <ul>
          <li><strong>Titre :</strong> Le titre du livre à ajouter.</li>
          <li><strong>Auteur :</strong> L'auteur·ice ou le collectif ayant écrit le livre.</li>
          <li><strong>Thématique :</strong> La thématique du livre (par exemple, "Éducation", "Sexualité", etc.).</li>
          <li><strong>Type :</strong> Le type du livre (Roman, essai, biographie etc).</li>
        </ul>
        <p>Une fois le formulaire rempli, cliquez sur "Ajouter" pour enregistrer le livre dans la base de données.</p>
      </section>
  
      <section class="guide-section">
        <h2>3. Modifier ou Supprimer un livre</h2>
        <p>Une fois que les livres sont ajoutés à la bibliothèque, vous pouvez les consulter, les modifier ou les supprimer.</p>
        <ul>
          <li><strong>Modifier :</strong> Cliquez sur un livre pour modifier ses informations.</li>
          <li><strong>Supprimer :</strong> Vous pouvez supprimer un livre de la bibliothèque en cliquant sur l'icône de suppression.</li>
        </ul>
      </section>
  
      <section class="guide-section">
        <h2>4. Exporter la bibliothèque</h2>
        <p>Vous avez également la possibilité d'exporter la bibliothèque au format Excel, pour un usage externe. Utilisez le bouton "Exporter" sur la page d'accueil pour générer un fichier Excel contenant toutes les données des livres.</p>
      </section>
  
      <footer class="guide-footer">
        <p><strong>Besoin d'aide ?</strong> Si vous avez des questions ou des suggestions, contactez-nous sur discord !</p>
        <div class="contact">
            <UAlert
                description="You can add components to your app using the cli."
                :avatar="{ src: 'https://avatars.githubusercontent.com/u/739984?v=4' }"
                title="Heads up!"
            />
            <UAlert
                description="@tartines "
                :avatar="{ src: 'ines.jpg' }"
                title="Inès B (elle)"
            />
    
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>

.contact {
  display: flex;
  flex-direction: column; 
  gap: 20px; 
  padding-top: 40px;
  align-items: center;
  /* width: 50%; */
}

  .guide-page {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .guide-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .guide-header h1 {
    font-size: 2.5rem;
    color: #333;
  }
  
  .guide-header p {
    font-size: 1.1rem;
    color: #555;
  }
  
  .guide-section {
    margin-bottom: 30px;
  }
  
  .guide-section h2 {
    font-size: 2rem;
    color: #2d3a3b;
    margin-bottom: 10px;
  }
  
  .guide-section ul {
    list-style-type: disc;
    margin-left: 20px;
    font-size: 1.1rem;
  }
  
  .guide-section ul li {
    margin-bottom: 10px;
  }
  
  .guide-footer {
    text-align: center;
    margin-top: 30px;
    font-size: 1.1rem;
    color: #666;
    border-top: 1px solid grey;
    padding-top: 40px;
  }
  </style>
  