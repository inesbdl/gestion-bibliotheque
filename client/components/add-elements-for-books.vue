<template>
    <form class="styled-form" @submit.prevent="submitElement">
        <UFormGroup :label="label" v-if="props.elementType === 'author'" required>
            <UInput 
                v-model="firstName" 
                placeholder="Prénom" 
                class="input-field" 
                required 
            />
            <UInput 
                v-model="lastName" 
                placeholder="Nom" 
                class="input-field" 
                required 
            />
        </UFormGroup>

        <UFormGroup :label="label" v-else required>
            <UInput 
                v-model="inputValue" 
                :placeholder="placeholder" 
                class="input-field" 
                required 
            />
        </UFormGroup>

        <UButton block type="submit"  variant="soft" color="primary">
            Ajouter
        </UButton>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    // pour definir quelle route API appeler
    elementType: {
        type: String,
        required: true
    }
});

// afficher notif
const toast = useToast();

const inputValue = ref<string>(''); 
const firstName = ref<string>('');
const lastName = ref<string>('');

const submitElement = async () => {
    if (props.elementType === 'author') {
        if (!firstName.value.trim() || !lastName.value.trim()) {
            toast.add({ title: 'Les champs Prénom et Nom sont obligatoires.', icon: "i-heroicons-exclamation-circle" });
            return;
        }
    } else {
        if (!inputValue.value.trim()) {
            toast.add({ title: 'Ce champ ne peut pas être vide.', icon: "i-heroicons-exclamation-circle" });
            return;
        }
    }

    let apiEndpoint = '';

    switch (props.elementType) {
        case 'author':
            apiEndpoint = 'api/author';
            break;
        case 'theme':
            apiEndpoint = 'api/theme';
            break;
        case 'edition':
            apiEndpoint = 'api/edition';
            break;
        case 'type':
            apiEndpoint = 'api/type';
            break;
        default:
            toast.add({ title: `Type d'élément invalide.`, icon: "i-heroicons-exclamation-circle" });
            return;
    }

    try {
        const payload =
            props.elementType === 'author'
                ? { firstName: firstName.value, lastName: lastName.value }
                : { name: inputValue.value };

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'élément.');
        }

        toast.add({ title: 'Élément ajouté avec succès.', icon: "i-heroicons-check" });

        // Réinitialisation des champs
        firstName.value = '';
        lastName.value = '';
        inputValue.value = '';
    } catch (error) {
        console.error(error);
        toast.add({ title: 'Une erreur est survenue. Veuillez réessayer.', icon: "i-heroicons-exclamation-circle" });
    }
};
</script>

<style scoped>
.styled-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.input-field {
    padding: 0.5rem;
    font-size: 1rem;
}

.submit-button {
    background-color: #bb00ff;
    color: white;
    font-size: 1rem;
    padding: 0.75rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.submit-button:hover {
    background-color: #bb00ffab;
}
</style>
