<template>
  <form class="form" @submit.prevent="handleLogin">
    <UFormGroup label="Adresse e-mail" required>
      <UInput
        v-model="email"
        placeholder="email@example.com"
        type="email"
        icon="i-heroicons-envelope"
        class="input-field"
      />
    </UFormGroup>

    <UFormGroup label="Mot de passe" required>
      <UInput
        v-model="password"
        placeholder="Votre mot de passe"
        type="password"
        icon="i-heroicons-lock-closed"
        class="input-field"
      />
    </UFormGroup>

    <UButton block class="submit-button" type="submit">
      Se connecter
    </UButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const router = useRouter()

const email = ref('');
const password = ref('');
const toast = useToast();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    toast.add({
      title: 'Veuillez remplir tous les champs',
      icon: 'i-heroicons-exclamation-circle',
      color: 'red',
    });
    return;
  }

  try {

    const response = await fetch('http://localhost:2000/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const data = await response.json();
    const user = useState('user')
    user.value = data

    toast.add({
      title: 'Connexion réussie',
      icon: 'i-heroicons-check',
      color: 'green',
    });

    router.push('/');

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
