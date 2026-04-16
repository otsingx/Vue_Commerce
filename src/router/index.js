import { createRouter, createWebHistory } from 'vue-router';
import { watch } from 'vue';
import { useUserStore } from '../stores/userStore';
import Accueil from '../views/Accueil.vue';
import Produits from '../views/Produits.vue';
import DetailsProduit from '../views/DetailsProduit.vue';
import Inscription from '../views/Inscription.vue';
import Connexion from '../views/Connexion.vue';
import Panier from '../views/Panier.vue';
import Erreur404 from '../views/Erreur404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil,
    },
    {
      path: '/produits',
      name: 'produits',
      component: Produits,
    },
    {
      path: '/details-produit/:id',
      name: 'details-produit',
      component: DetailsProduit,
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription,
      meta: { invite: true },
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion,
      meta: { invite: true },
    },
    {
      path: '/panier',
      name: 'panier',
      component: Panier,
      meta: { prive: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'erreur404',
      component: Erreur404,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (!userStore.authPret) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => userStore.authPret,
        (pret) => {
          if (pret) {
            unwatch();
            resolve();
          }
        },
      );
    });
  }

  if (to.meta.prive && !userStore.isConnecte) {
    return { name: 'connexion' };
  }
  if (to.meta.invite && userStore.isConnecte) {
    return { name: 'accueil' };
  }
  return true;
});

export default router;
