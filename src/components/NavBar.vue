<template>
  <nav :class="['navbar', estAccueil ? 'navbar-transparente' : 'navbar-gradient']" aria-label="Navigation principale">
    <div class="nav-logo">
      <RouterLink to="/" class="logo-texte">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10h20l-2 16H8L6 10z" stroke="#475665" stroke-width="2" stroke-linejoin="round" fill="#fbd0d3" />
          <path d="M11 10V8a5 5 0 0 1 10 0v2" stroke="#475665" stroke-width="2" stroke-linecap="round" />
        </svg>
        Boutique
      </RouterLink>
    </div>

    <button class="hamburger" @click="menuOuvert = !menuOuvert" aria-label="Menu">
      <Menu v-if="!menuOuvert" :size="26" :stroke-width="2.5" />
      <X v-else :size="26" :stroke-width="2.5" />
    </button>

    <ul :class="['nav-menu', { 'nav-menu--ouvert': menuOuvert }]">
      <template v-if="userStore.isConnecte">
        <li>
          <span class="bjr">Bonjour, {{ userStore.prenomSeulement }} ❤️</span>
        </li>
        <li><RouterLink to="/" @click="menuOuvert = false">Accueil</RouterLink></li>
        <li><RouterLink to="/produits" @click="menuOuvert = false">Produits</RouterLink></li>
        <li>
          <RouterLink to="/panier" @click="menuOuvert = false">Panier ({{ panierStore.totalItems }})</RouterLink>
        </li>
        <li><button @click="logout" class="btn btn-deconnexion">Déconnexion</button></li>
      </template>

      <template v-else>
        <li><RouterLink to="/" @click="menuOuvert = false">Accueil</RouterLink></li>
        <li><RouterLink to="/produits" @click="menuOuvert = false">Produits</RouterLink></li>
        <li><RouterLink to="/connexion" @click="menuOuvert = false">Se connecter</RouterLink></li>
        <li><RouterLink to="/inscription" class="btn btn-secondary btn-compte" @click="menuOuvert = false">Créer un compte</RouterLink></li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { usePanierStore } from '../stores/panierStore';
import { computed, ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const panierStore = usePanierStore();
const menuOuvert = ref(false);

const estAccueil = computed(() => route.name === 'accueil' || route.path === '/');

const logout = async () => {
  await signOut(auth);
  userStore.deconnexion();
  panierStore.vider();
  menuOuvert.value = false;
  router.push('/');
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.nav-menu a.router-link-active {
  background: var(--neutral-tint);
  box-shadow: var(--shadow-sm);
}

.navbar-transparente {
  background: transparent;
  border-bottom: none;
  box-shadow: none;
  position: absolute;
  left: 0;
  right: 0;
}

.navbar-gradient {
  background: linear-gradient(135deg, #fbd0d3 0%, #dae2da 100%);
  box-shadow: var(--shadow-sm);
}

.nav-logo {
  width: auto;
}

.logo-texte {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  font-weight: 800;
  font-size: var(--font-size-xl);
  color: var(--neutral-soft);
}

.nav-menu {
  list-style: none;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin: 0;
  padding: var(--space-4);
}

.nav-menu a {
  text-decoration: none;
  font-weight: 600;
  color: var(--neutral-soft);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-menu a:hover {
  background: var(--neutral-tint);
  box-shadow: var(--shadow-sm);
}

.btn.btn-secondary.btn-compte {
  color: var(--neutral-soft);
  background-color: var(--secondary-color);
  border-bottom: 3px solid var(--gray-400);
  font-weight: 700;
}

.btn.btn-secondary.btn-compte:hover {
  color: var(--neutral-soft);
  background-color: var(--neutral-tint);
  border-bottom: 3px solid var(--gray-400);
  font-weight: 700;
}

.bjr {
  font-weight: 700;
  color: var(--accent-color);
}

.hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  color: var(--neutral-soft);
  z-index: 60;
}

/* MEDIA */
@media (max-width: 992px) {
  .hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-end;
    padding: var(--space-2);
    gap: var(--space-2);
    background: linear-gradient(135deg, #fbd0d3 0%, #dae2da 100%);
    z-index: 50;
  }

  .nav-menu--ouvert {
    display: flex;
  }

  .nav-menu a {
    width: 100%;
    display: block;
  }

  .logo-texte {
    font-size: var(--font-size-lg);
  }
}
</style>
