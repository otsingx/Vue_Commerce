<template>
  <div class="message-global">
    <BoiteMessage v-if="chargement" type="info"> Chargement... </BoiteMessage>
  </div>
  <section class="container mt-24">
    <h2 class="produits-titre text-center mb-12">Liste des produits</h2>

    <div class="filtre-categorie mx-auto mb-8">
      <label for="categorie" class="sr-only">Filtrer par catégorie</label>
      <select id="categorie" name="categorie" v-model="categorieSelectionnee" @change="filtrer">
        <option value="all">Toutes les catégories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="cartes-produits" v-if="produits.length">
      <CarteProduit v-for="p in produits" :key="p.id" :produit="p" />
    </div>

    <BoiteMessage v-if="!chargement && !erreur && produits.length === 0" type="info"> Aucun produit dans cette catégorie. </BoiteMessage>
  </section>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFakeStoreApi } from '../composables/useFakeStoreApi';
import CarteProduit from '../components/CarteProduit.vue';
import BoiteMessage from '../components/BoiteMessage.vue';
import { usePanierStore } from '../stores/panierStore';

const panierStore = usePanierStore();
const route = useRoute();
const router = useRouter();

const { produits, categories, chargement, erreur, chargerProduits, chargerCategories, chargerProduitsParCategorie } = useFakeStoreApi();

const categorieSelectionnee = ref('all');

const chargerSelonCategorie = () => {
  const categorie = route.query.categorie;

  if (categorie) {
    categorieSelectionnee.value = categorie;
    chargerProduitsParCategorie(categorie);
  } else {
    categorieSelectionnee.value = 'all';
    chargerProduits();
  }
};

onMounted(() => {
  chargerCategories();
  chargerSelonCategorie();
});

watch(
  () => route.query.categorie,
  () => {
    chargerSelonCategorie();
  },
);

const filtrer = () => {
  const categorie = categorieSelectionnee.value;

  if (categorie === 'all') {
    router.push({ name: 'produits' });
  } else {
    router.push({
      name: 'produits',
      query: { categorie },
    });
  }
};
</script>

<style scoped>
.filtre-categorie {
  max-width: 300px;
  width: 100%;
}

select {
  border: 2px solid var(--gray-400);
  width: 100%;
}

.cartes-produits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

@media (max-width: 768px) {
  .cartes-produits {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .filtre-categorie {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .cartes-produits {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  .produits-titre {
    margin-bottom: var(--space-6);
  }
}
</style>
