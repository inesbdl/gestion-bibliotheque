<template>
    <form class="styled-form">
        <UFormGroup :label="label" required>
          <UInput :placeholder="placeholder" class="input-field" />
        </UFormGroup>
  
        <UButton block type="submit" class="submit-button">
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
</script>