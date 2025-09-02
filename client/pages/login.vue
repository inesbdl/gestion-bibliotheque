<template>
  <section>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
        margin-top: 60px;
      "
    >
      <h2 class="title">Connexion</h2>
    </div>

    <div class="container">
      <div class="form-container">
        <LoginForm />

        <div class="register-redirect">
          <p>Pas encore de compte ?</p>
          <NuxtLink to="/register">
            <UButton variant="ghost" size="sm">Créer un compte</UButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

section {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2.5rem;
  color: #c6c5c5;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.form-container {
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(176, 174, 174, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.register-redirect {
  margin-top: 20px;
  text-align: center;
  color: #aaa;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
