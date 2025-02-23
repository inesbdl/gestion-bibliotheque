<template>
  <div class="guide-page">
    <header class="guide-header">
      <h1>Guide de l'application</h1>
      <p>
        Bienvenue dans l'application de gestion de bibliothèque du Planning
        Familial 33.
      </p>
    </header>

    <UAccordion
      color="primary"
      variant="soft"
      size="sm"
      :items="[
        {
          label: '1. Accueil',
          content:
            'La page d\'accueil vous permet de rechercher et de filtrer les livres disponibles dans la bibliothèque du planning familial. Vous pouvez utiliser la barre de recherche pour trouver un livre par titre, auteur, type, isbn ou thématique. Barre de recherche : Recherchez des livres par mot-clé. Filtres : Affinez la recherche en filtrant par auteur, thématique et type de livre.',
        },
        {
          label: '2. Ajouter un livre',
          content:
            'Sur la page Ajouter un livre, vous pouvez entrer toutes les informations relatives à un nouveau livre que vous souhaitez ajouter à la bibliothèque. Titre : Le titre du livre à ajouter. Auteur : L\'auteur·ice ou le collectif ayant écrit le livre. Thématique : La thématique du livre (par exemple, Éducation, Sexualité, etc.). Type : Le type du livre (Roman, essai, biographie, etc.). Si ce livre est une proposition, vous pouvez cocher la case Ce livre est une proposition. Une fois le formulaire rempli, cliquez sur Ajouter pour enregistrer le livre dans la base de données.',
        },
        {
          label: '3. Modifier ou Supprimer un livre | Pas encore disponible',
          content:
            'Une fois que les livres sont ajoutés à la bibliothèque, vous pouvez les consulter, les modifier ou les supprimer. Modifier : Cliquez sur un livre pour modifier ses informations. Supprimer : Vous pouvez supprimer un livre de la bibliothèque en cliquant sur l\'icône de suppression.',
        },
        {
          label: '4. Exporter la bibliothèque',
          content:
            'Vous avez également la possibilité d\'exporter la bibliothèque au format Excel, pour un usage externe. Utilisez le bouton Exporter sur la page paramètres pour générer un fichier Excel contenant les dpnnées.',
        },
      ]"
    />

    <footer class="guide-footer">
      <UDivider icon="i-simple-icons-discord" />
      <p style="margin-top: 20px;">
        <strong>Besoin d'aide ?</strong> Si vous avez des questions ou des
        suggestions, contactez-nous sur discord !
      </p>
      <div class="contact">
        <UAlert
          description="@oswinfreyr"
          :avatar="{ src: 'aurora.png' }"
          title="Aurora (iel/elle)"
          color="primary" variant="subtle"
        />
        <UAlert
          description="@tartines "
          :avatar="{ src: 'ines.jpg' }"
          title="Inès B (elle)"
          color="primary" variant="subtle"

        >
      </UAlert>
      <div class="contact">
        <a href="https://discord.com/users/449290197310373899" target="_blank" class="discord-link">
          <button class="discord-button">Ouvrir Discord</button>
        </a>
      </div>
      </div>
    </footer>
  </div>
</template>

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
  font-family: "Arial", sans-serif;
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
  color: #cfcece;
}

.guide-header p {
  font-size: 1.1rem;
  color: #797878;
}

.guide-footer {
  text-align: center;
  /* margin-top: 30px; */
  font-size: 1.1rem;
  color: #797878;
  padding-top: 40px;
}
</style>
