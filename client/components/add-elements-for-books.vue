<template>
    <form class="styled-form">
        <UFormGroup :label="label" required>
          <UInput :placeholder="placeholder" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button" @click="submitElement">
          Ajouter 
        </UButton>
      </form>
</template>

<script setup>
    const props = defineProps({
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        // pour déterminer quelle route api appeler lors de l'ajout
        elementType: {
            type: String,
            required: true
        }
    });

    const submitElement = async (event: Event) => {

        event.preventDefault(); 

        if (booksIsbn.value.includes(isbn.value)) {
            toast.add({ title: 'Un livre possède déjà cet ISBN', icon: "i-heroicons-exclamation-circle", color: "red" });
            return;
        }

        const element = {
            
        };

        // API Call
        toast.add({ title: 'Element ajouté avec succès', icon: "i-heroicons-check" });
        console.log(element);
};
</script>