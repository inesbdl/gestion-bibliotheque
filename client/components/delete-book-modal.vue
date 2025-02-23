<template>
    <div class="modal">
      <p>Voulez-vous vraiment supprimer ce livre ?</p>
      <span>Attention cette action est irréversible.</span>
      <div class="buttons">
        <UButton color="gray" variant="solid" type="submit" @click="$emit('confirm')">Supprimer</UButton>
        <UButton color="gray" variant="solid" type="submit" @click="$emit('close')">Annuler</UButton>
      </div>
    </div>
</template>
  


<style  scoped>
  .modal {
  background-color: rgb(43, 1, 1);
  padding: 25px 40px;
  border: 2px solid rgb(68, 2, 2);
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

span{
  font-style: italic;
}

.buttons {
  display: flex;
  gap:10px;
}

</style>