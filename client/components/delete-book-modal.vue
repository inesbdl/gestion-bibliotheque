<template>
    <div class="modal">
      <p>Voulez-vous vraiment supprimer {{ book.title }} de {{ book.author.name }} ?</p>
      <span>Attention cette action est irréversible.</span>
      <div class="buttons">
        <UButton color="gray" variant="solid" type="submit" @click="$emit('confirm')">Supprimer</UButton>
        <UButton color="gray" variant="solid" type="submit" @click="$emit('close')">Annuler</UButton>
      </div>
    </div>
</template>
  

<script>
  export default {
    props : {
      book: Object,
    }
  }
</script>

<style  scoped>
  .modal {
  background-color: rgba(43, 1, 1, 0.934);
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