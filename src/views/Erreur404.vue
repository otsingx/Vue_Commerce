<template>
  <div class="erreur404 text-center">
    <h1>404 - Page introuvable</h1>
    <p>La page demandée n'existe pas.</p>
    <RouterLink class="btn-retour" to="/">Retour à l'accueil</RouterLink>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.btn-retour {
  display: inline-block;
  margin-top: var(--space-6);
  padding: var(--space-3) var(--space-6);
  background-color: #3490dc;
  color: var(--neutral-tint);
  border-radius: var(--radius-lg);
  text-decoration: none;
}
</style>
