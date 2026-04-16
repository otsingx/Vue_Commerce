<template>
  <div class="message-global">
    <BoiteMessage v-if="panierStore?.message" type="succes">{{ panierStore.message }}</BoiteMessage>
    <BoiteMessage v-if="afficherChargement"type="info">Chargement...</BoiteMessage>
    <BoiteMessage v-if="erreur" type="erreur">Produit introuvable.</BoiteMessage>
  </div>

  <section class="carte-details container mt-24" v-if="detailsProduit && !afficherChargement && !erreur">
    <div class="detail-image">
      <img :src="detailsProduit.thumbnail" :alt="detailsProduit.title" class="image-produit" />
    </div>

    <div class="infos-produit">
      <span class="badge-categorie">{{ categoriesFR[detailsProduit.category] || detailsProduit.category }}</span>

      <h2 class="produit-titre">{{ detailsProduit.title }}</h2>

      <div class="rating-ligne">
        <Star :size="18" class="rating-icon" />
        <span class="rating-score">{{ detailsProduit.rating }}</span>
        <span class="rating-label">/ 5</span>
      </div>

      <div class="prix-wrapper">
        <span class="prix">{{ detailsProduit.price }} $</span>
      </div>

      <div class="separateur"></div>

      <p class="description">{{ detailsProduit.description }}</p>

      <div class="separateur"></div>

      <button class="btn btn-achat" @click="ajouterAuPanier">
        <ShoppingBag :size="20" />
        Ajouter au panier
      </button>

      <div class="garanties">
        <span class="garantie-item"><Truck :size="20" class="garantie-icon" />Livraison dès 50$</span>
        <span class="garantie-item"><Lock :size="20" class="garantie-icon" />Paiement sécurisé</span>
        <span class="garantie-item"><RotateCcw :size="20" class="garantie-icon" />Retours 30 jours</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFakeStoreApi } from '../composables/useFakeStoreApi';
import { useUserStore } from '../stores/userStore';
import { usePanierStore } from '../stores/panierStore';
import BoiteMessage from '../components/BoiteMessage.vue';
import { Truck, Lock, RotateCcw, Star, ShoppingBag } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const panierStore = usePanierStore();
const { detailsProduit, afficherChargement, erreur, chargerProduitParId } = useFakeStoreApi();

const categoriesFR = {
  'womens-dresses': 'Vêtements femme',
  'mens-shirts': 'Vêtements homme',
  'womens-jewellery': 'Bijoux',
  laptops: 'Électronique',
};

onMounted(() => chargerProduitParId(route.params.id));

const ajouterAuPanier = () => {
  if (!userStore.isConnecte) {
    router.push({ path: '/connexion', query: { redirect: route.fullPath } });
    return;
  }
  panierStore.ajouter(detailsProduit.value);
  setTimeout(() => {
    router.back();
  }, 2000);
};
</script>

<style scoped>
.carte-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
  align-items: start;
   background: linear-gradient(to bottom, #fce5e7, #edf1ed);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.detail-image {
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.image-produit {
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: var(--radius-lg);
  transition: transform 0.4s ease;
}

.detail-image:hover .image-produit {
  transform: scale(1.04);
}

.infos-produit {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.badge-categorie {
  display: inline-block;
  background: linear-gradient(to right, #fef0f1, #f0f4f0);
  color: var(--neutral-soft);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: var(--space-1) var(--space-4);
  border-radius: 999px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
}

.produit-titre {
  
  font-weight: 800;
  color: var(--neutral-soft);
  line-height: 1.2;
  margin: 0;
}

.rating-ligne {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.rating-score {
  font-weight: 700;
  color: var(--neutral-soft);
}
.rating-label {
  color: var(--gray-400);
  font-size: var(--font-size-sm);
}

.prix-wrapper {
  display: flex;
  align-items: baseline;
}

.prix {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  color: var(--neutral-soft);
}


.description {
  color: var(--neutral-soft);
  opacity: 0.8;
  line-height: 1.7;
  margin: 0;
}

.garanties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-top: var(--space-2);
}

.garantie-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--neutral-soft);
  opacity: 0.7;
}

.garantie-icon {
  color: var(--error-soft);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .carte-details {
    grid-template-columns: 1fr; /* ← stack vertically */
    gap: var(--space-6);
    padding: var(--space-6);
    margin-top: var(--space-2);
  }

  .detail-image {
    min-height: 280px;
    padding: var(--space-6);
  }

  .image-produit {
    max-height: 280px;
  }
  .produit-titre {
    font-size: var(--font-size-2xl);
  }
  .prix {
    font-size: var(--font-size-3xl);
  }
}

@media (max-width: 480px) {
  .detail-image {
    min-height: 220px;
    padding: var(--space-2);
  }

  .garanties {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style>
