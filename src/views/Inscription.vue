<template>
  <div class="message-global">
    <BoiteMessage v-if="message" :type="messageType">{{ message }}</BoiteMessage>
  </div>

  <section class="container mt-24 conteneur-page">
    <h2 class="inscription-titre text-center mb-12">Créer un compte</h2>

    <form @submit="inscription" class="formulaire mx-auto">
      <div>
        <label for="prenom">Prénom</label>
        <input id="prenom" name="prenom" type="text" v-model="prenom" autocomplete="given-name" placeholder="Entrez votre prénom" />
      </div>

      <div>
        <label for="nom">Nom</label>
        <input id="nom" name="nom" type="text" v-model="nom" autocomplete="family-name" placeholder="Entrez votre nom" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" v-model="email" autocomplete="email" placeholder="Entrez votre email" />
      </div>

      <div>
        <label for="pwd">Mot de passe</label>
        <input id="pwd" name="password" type="password" v-model="pwd" autocomplete="new-password" placeholder="Entrez votre mot de passe" />
      </div>

      <button type="submit" class="btn btn-primary btn-petit">Créer un compte</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import BoiteMessage from '../components/BoiteMessage.vue';

const prenom = ref('');
const nom = ref('');
const email = ref('');
const pwd = ref('');
const message = ref('');
const messageType = ref('');

const router = useRouter();
const userStore = useUserStore();

const inscription = async (e) => {
  e.preventDefault();
  message.value = '';

  if (!prenom.value || !nom.value || !email.value || !pwd.value) {
    messageType.value = 'erreur';
    message.value = 'Veuillez remplir tous les champs.';
    return;
  }

  if (pwd.value.length < 6) {
    messageType.value = 'erreur';
    message.value = 'Le mot de passe doit contenir au moins 6 caractères.';
    return;
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email.value, pwd.value);
    await updateProfile(result.user, {
      displayName: `${prenom.value} ${nom.value}`,
    });

    userStore.connexion(result.user);

    messageType.value = 'succes';
    message.value = 'Compte créé avec succès ! Vous serez redirigé dans un instant.';

    prenom.value = '';
    nom.value = '';
    email.value = '';
    pwd.value = '';

    setTimeout(() => {
      router.push('/connexion');
    }, 2000);
  } catch (error) {
    messageType.value = 'erreur';

    if (error.code === 'auth/email-already-in-use') {
      message.value = 'Cet email est déjà utilisé.';
    } else if (error.code === 'auth/invalid-email') {
      message.value = 'Adresse email invalide.';
    } else {
      message.value = 'Erreur: ' + error.message;
    }
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

  .inscription-titre {
   margin-bottom: var(--space-6);
  }
}
</style>



