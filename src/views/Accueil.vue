<template>
  <div>
    <!-- HERO -->
    <section class="hero mb-16">
      <div class="hero-contenu">
        <h1 class="hero-titre mb-4 mt-16">Votre style, à votre façon</h1>
        <p class="hero-sous-titre mb-12">Explorez nos collections et trouvez ce qui vous ressemble</p>
        <RouterLink to="/produits" class="btn btn-primary"> Voir les produits → </RouterLink>
      </div>
    </section>

    <!-- IMG -->
    <section class="container images-section mb-16" aria-labelledby="categories-title">
      <h2 id="categories-title" class="sr-only">Catégories</h2>

      <div class="accueil-images">
        <RouterLink v-for="cat in categoriesImages" :key="cat.label" class="accueil-img-wrapper" :to="{ name: 'produits', query: { categorie: cat.label } }" :aria-label="`Voir ${cat.label}`">
          <img :src="cat.src" alt="" class="accueil-img" />
          <div class="img-overlay" aria-hidden="true">
            <span>{{ cat.label }} →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ICÔNES DE SERVICE-->
    <section class="section-services" aria-labelledby="engagements-title">
      <div class="container">
        <div class="services-contenu">
          <h2 id="engagements-title" class="sr-only">Nos engagements</h2>

          <ul class="services-liste">
            <li v-for="service in services" :key="service.titre" class="service">
              <span class="service-icone" aria-hidden="true">
                <component :is="service.icone" :size="22" :stroke-width="2.5" />
              </span>
              <p class="service-titre">{{ service.titre }}</p>
              <p class="service-sous">{{ service.sous }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useFakeStoreApi } from '../composables/useFakeStoreApi';
import femmes from '../assets/femmes.jpg';
import hommes from '../assets/hommes.jpg';
import bioux from '../assets/bioux.jpg';
import electronics from '../assets/electronics.jpg';
import { Truck, Lock, RotateCcw, MessageCircle } from 'lucide-vue-next';

const { chargerCategories } = useFakeStoreApi();

onMounted(() => chargerCategories());

const categoriesImages = [
  { label: 'Vêtements femme', src: femmes },
  { label: 'Vêtements homme', src: hommes },
  { label: 'Bijoux', src: bioux },
  { label: 'Électronique', src: electronics },
];

const services = [
  { icone: Truck, titre: 'Livraison gratuite', sous: "Dès 50$ d'achat" },
  { icone: Lock, titre: 'Paiement sécurisé', sous: '100% protégé' },
  { icone: RotateCcw, titre: 'Retours faciles', sous: 'Sous 30 jours' },
  { icone: MessageCircle, titre: 'Support 7j/7', sous: 'On est là pour vous' },
];
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #fbd0d3 0%, #dae2da 100%);
  padding: calc(var(--space-16) + 120px) var(--space-12) var(--space-16);
  text-align: center;
}

.hero-contenu {
  max-width: 640px;
  margin: 0 auto;
}

.hero-titre {
  font-weight: 700;
}

.hero-sous-titre {
  font-size: var(--font-size-lg);
  color: var(--neutral-soft);
  opacity: 0.9;
}

/* ICÔNES DE SERVICE */
.section-services {
  margin-bottom: 0;
}

.services-contenu {
  padding: var(--space-8);
  background: var(--white);
  border-radius: var(--radius-lg);
}

.services-liste {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}

.service {
  text-align: center;
  min-width: 120px;
}

.service-icone {
  font-size: 2rem;
  display: block;
  margin-bottom: var(--space-2);
  color: var(--error-soft);
}

.service-titre {
  font-weight: 700;
  color: var(--neutral-soft);
  margin: 0;
  font-size: var(--font-size-sm);
}

.service-sous {
  font-size: var(--font-size-xs);
  color: var(--gray-500);
  margin: 0;
}

/* IMG */

.accueil-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.accueil-img-wrapper {
  position: relative;
  display: block;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
}

.accueil-img {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.4s ease;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(71, 86, 101, 0.7) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: var(--space-6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.img-overlay span {
  color: var(--white);
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.accueil-img-wrapper:hover .accueil-img,
.accueil-img-wrapper:focus-visible .accueil-img {
  transform: scale(1.04);
}

.accueil-img-wrapper:hover .img-overlay,
.accueil-img-wrapper:focus-visible .img-overlay {
  opacity: 1;
}

.accueil-img-wrapper:focus-visible {
  outline: 3px solid var(--error-soft);
  outline-offset: 4px;
}

@media (max-width: 768px) {
  .accueil-images {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .images-section {
    margin-bottom: 0;
    padding-inline: var(--space-4);
  }

  .services-liste {
    gap: var(--space-2);
  }

  .hero {
    padding: var(--space-12) var(--space-6) var(--space-8);
    margin-bottom: var(--space-6);
  }

  .hero-sous-titre {
    margin-bottom: var(--space-4);
     font-size: var(--font-size-base);
  }
}
</style>
