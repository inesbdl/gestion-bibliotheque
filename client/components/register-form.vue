<template>
  <form class="form" @submit.prevent="handleRegister">
    <UFormGroup label="Prénom" required>
      <UInput
        v-model="firstName"
        placeholder="Prenom"
        icon="i-heroicons-user"
        class="input-field"
      />
    </UFormGroup>

    <UFormGroup label="Nom" required>
      <UInput
        v-model="lastName"
        placeholder="Nom"
        icon="i-heroicons-user"
        class="input-field"
      />
    </UFormGroup>

    <UFormGroup label="Email" required>
      <UInput
        v-model="email"
        type="email"
        placeholder="email@example.com"
        icon="i-heroicons-envelope"
        class="input-field"
      />
    </UFormGroup>

    <UFormGroup label="Mot de passe" required>
      <UInput
        v-model="password"
        type="password"
        placeholder="********"
        icon="i-heroicons-lock-closed"
        class="input-field"
      />
    </UFormGroup>

    <UFormGroup label="Confirmer le mot de passe" required>
      <UInput
        v-model="confirmPassword"
        type="password"
        placeholder="********"
        icon="i-heroicons-lock-closed"
        class="input-field"
      />
    </UFormGroup>

    <UButton block class="submit-button" type="submit">
      Créer le compte
    </UButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const toast = useToast();

const handleRegister = async () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    toast.add({
      title: 'Tous les champs sont requis',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
    return;
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password.value)) {
    toast.add({
      title: 'Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.add({
      title: 'Les mots de passe ne correspondent pas',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
    return;
  }

  try {
    const response = await fetch('http://localhost:2000/api/v1/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        password: password.value,
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du compte");
    }

    // const data = await response.json()
    // const user = useState('user');
    // user.value = data;

    toast.add({
      title: 'Compte créé avec succès !',
      icon: 'i-heroicons-check',
      color: 'green',
    });

    router.push('/login');

  } catch (error: any) {
    toast.add({
      title: error.message,
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-field {
  width: 100%;
}

.submit-button {
  margin-top: 20px;
}
</style>
