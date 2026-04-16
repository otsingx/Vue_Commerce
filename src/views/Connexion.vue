<template>
  <div class="message-global">
    <BoiteMessage v-if="message" :type="typeMessage">{{ message }}</BoiteMessage>
  </div>

  <section class="container conteneur-page mt-24">
    <h2 class="connexion-titre text-center mb-12">Se connecter</h2>

    <form @submit="connexionEmail" class="formulaire mx-auto">
      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" v-model="email" autocomplete="email" placeholder="Entrez votre email" />
      </div>

      <div>
        <label for="pwd">Mot de passe</label>
        <input id="pwd" name="password" type="password" v-model="pwd" autocomplete="current-password" placeholder="Entrez votre mot de passe" />
      </div>

      <button type="submit" class="btn btn-primary btn-petit">Se connecter</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useUserStore } from '../stores/userStore';
import { useRouter, useRoute } from 'vue-router';
import BoiteMessage from '../components/BoiteMessage.vue';

const email = ref('');
const pwd = ref('');
const message = ref('');
const typeMessage = ref('erreur');

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const connexionEmail = async (e) => {
  e.preventDefault();
  message.value = '';

  if (!email.value || !pwd.value) {
    message.value = 'Veuillez remplir tous les champs !';
    typeMessage.value = 'erreur';
    return;
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email.value, pwd.value);
    userStore.connexion(result.user);

    message.value = 'Connexion réussie ! Redirection...';
    typeMessage.value = 'succes';

    setTimeout(() => {
      const redirectPath = route.query.redirect || '/';
      router.push(redirectPath);
    }, 2000);
  } catch (error) {
    message.value = 'Adresse e-mail ou mot de passe incorrect';
    typeMessage.value = 'erreur';
  }
};
</script>

<style scoped>
.conteneur-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formulaire {
  width: 100%;
  max-width: 480px;
  background: var(--secondary-color);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (max-width: 480px) {
  .formulaire {
    padding: var(--space-4);
    gap: var(--space-4);
  }

  .connexion-titre {
  margin-bottom: var(--space-6);
  }
}
</style>



