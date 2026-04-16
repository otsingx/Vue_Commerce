<template>
  <RouterLink :to="`/details-produit/${produit.id}`" class="carte">
    <div class="carte-haut">
      <img :src="produit.thumbnail" :alt="produit.title" class="carte-image my-4" />
      <h4 class="carte-titre">
        {{ produit.title }}
      </h4>
    </div>

    <div class="carte-contenu">
      <p class="prix">{{ produit.price }} $</p>
      <p class="rating">
        <Star :size="16" :stroke-width="2.5" class="rating-icon" />
        <span>{{ produit.rating }}</span>
      </p>
      <p class="categorie">Catégorie : {{ categoriesFR[produit.category] || produit.category }}</p>
    </div>
  </RouterLink>
</template>

<script setup>
import { Star } from 'lucide-vue-next';
defineProps({
  produit: Object,
});

const categoriesFR = {
  'womens-dresses': 'Vêtements femme',
  'mens-shirts': 'Vêtements homme',
  'womens-jewellery': 'Bijoux',
  laptops: 'Électronique',
};
</script>

<style scoped>
.carte {
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  text-decoration: none;
  color: inherit;
  height: 100%;
  overflow: hidden;
  border: 2px solid transparent;
  transition:
    box-shadow 0.25s ease,
    transform 0.25s ease;
  background: linear-gradient(to bottom, #fce5e7, #edf1ed);
}

.carte-haut {
  display: flex;
  flex-direction: column;
  background: var(--white);
  padding: var(--space-6) var(--space-4) var(--space-2);
  border-radius: var(--radius-lg);
}

.carte-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  transition: transform 0.35s ease;
}

.carte-titre {
  text-align: left;
  color: var(--neutral-soft);
  min-height: var(--space-2);
  overflow: hidden;
  margin-top: var(--space-3);
  min-height: 2.6em;
  line-height: 1.3;
}

.categorie {
  min-height: 2.4em;
  line-height: 1.3;
}

.carte-contenu {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
  padding-bottom: 0;
}

.carte:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border: 2px solid var(--primary-color);
}

.carte:hover .carte-image {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .carte-image {
    height: 160px;
  }
}

@media (max-width: 480px) {
  .carte-image {
    height: 200px;
  }

  .carte-haut {
    padding: var(--space-4) var(--space-3) var(--space-2);
  }

  .carte-contenu {
    padding: var(--space-3);
  }

  .carte:hover {
    transform: none; 
  }
  .carte-contenu p:last-child {
    margin-bottom: 0;
  }
}
</style>
