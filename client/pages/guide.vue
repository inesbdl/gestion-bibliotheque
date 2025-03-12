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
            'La page d\'accueil vous permet de rechercher et de filtrer les livres disponibles dans la bibliothèque du planning familial. Vous pouvez utiliser la barre de recherche pour trouver un livre par titre, auteur, type, isbn ou thématique. Vous pouvez rechercher des livres par mot-clé via la barre de recherche et affiner la recherche grâce aux filtres.',
        },
        {
          label: '2. Modifier ou Supprimer un livre',
          content:
            'Vous pouvez modifier et/ou supprimer un livre en cliquant sur les icônes correspondants dans es tableaux présentas sur les pages d\'accueil et de proposition de livres.',
        },
        {
          label: '3. Ajouter un livre',
          content:
            'Sur la page Ajouter un livre, vous pouvez entrer toutes les informations relatives à un nouveau livre que vous souhaitez ajouter à la bibliothèque. Si ce livre est une proposition, vous pouvez cocher la case Ce livre est une proposition. Une fois le formulaire rempli, cliquez sur Ajouter pour enregistrer le livre dans la bibliothèque.',
        },
        {
          label: '4. Ajouter des éléments',
          content:
            'Dans le paramètres, vous avez la possibilité d\'ajouter des types, thématiques, auteur·ices etc si vous ne les trouvez pas lors de l\'ajout d\'un nouveau livre',
        },
        {
          label: '5. Exporter la bibliothèque',
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
        <a href="https://discord.com" target="_blank" class="discord-link">
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
  color: #c6c5c5;
  text-transform: uppercase;
  margin-bottom: 20px;
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
