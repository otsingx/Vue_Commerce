<template>
  <section class="container mt-24 page-panier">
    <h2 class="panier-titre text-center mb-12">Votre panier</h2>

    <div v-if="panierStore.items.length === 0" class="panier-vide">
      <img src="../assets/panier-achats.jpg" alt="Panier vide" class="image-vide" />

      <BoiteMessage type="info" class="col-12 mt-4"> Votre panier est vide </BoiteMessage>
    </div>

    <div v-else class="panier-contenu">
      <div class="liste-articles">
        <div class="item" v-for="item in panierStore.items" :key="item.id">
          <img :src="item.image" :alt="item.title" class="item-image" />

          <div class="item-details">
            <h3 class="item-titre">{{ item.title }}</h3>

            <h4 class="mb-4">Description</h4>
            <p>{{ item.description }}</p>

            <p><strong>Prix :</strong> {{ item.price }} $</p>
            <p><strong>Quantité :</strong> {{ item.quantity }}</p>
            <button class="btn btn-danger-soft" @click="demanderConfirmation(item)">Retirer</button>
          </div>
        </div>
      </div>

      <div class="resume">
        <h3 class="mb-4">Résumé de l'achat</h3>

        <p><strong>Sous-total :</strong> {{ panierStore.sousTotal.toFixed(2) }} &nbsp;$</p>
        <p><strong>Taxes :</strong> {{ panierStore.taxes.toFixed(2) }} &nbsp;$</p>
        <p><strong>Total :</strong> {{ panierStore.total.toFixed(2) }} &nbsp;$</p>
      </div>

      <div v-if="itemASupprimer" class="overlay-confirmation" @click="annulerSuppression">
        <div class="boite-confirmation" @click.stop>
          <h3>Confirmer le retrait</h3>

          <p>
            Voulez-vous vraiment retirer :
            <strong>{{ itemASupprimer.title }}</strong> ?
          </p>

          <div class="actions-confirmation">
            <button class="btn btn-neutral" @click="annulerSuppression">Annuler</button>

            <button class="btn btn-danger" @click="confirmerSuppression">Retirer</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { usePanierStore } from '../stores/panierStore';
import { useUserStore } from '../stores/userStore';
import BoiteMessage from '../components/BoiteMessage.vue';

const panierStore = usePanierStore();
const userStore = useUserStore();

const itemASupprimer = ref(null);

const demanderConfirmation = (item) => {
  itemASupprimer.value = item;
};

const annulerSuppression = () => {
  itemASupprimer.value = null;
};

const confirmerSuppression = () => {
  panierStore.retirer(itemASupprimer.value.id);
  itemASupprimer.value = null;
};
</script>

<style scoped>
.panier-contenu {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-8);
  align-items: start;
}

.liste-articles .item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-6);
 background: linear-gradient(to bottom, #fce5e7, #edf1ed);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  align-items: start;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

.item-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  border-radius: var(--radius-md);
  background: var(--white);
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  min-width: 0;
}

.item-titre {
  margin-top: 0;
  margin-bottom: var(--space-4);
}
.resume {
 background: linear-gradient(to bottom, #fce5e7, #edf1ed);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  height: fit-content;
}

.panier-vide {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-12) 0;
}

.image-vide {
  width: 40%;
  height: auto;
  border-radius: var(--radius-lg);
}

.overlay-confirmation {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.boite-confirmation {
  background: var(--neutral-tint);
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.actions-confirmation {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-6);
}

@media (max-width: 768px) {
  .panier-contenu {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .liste-articles .item {
    grid-template-columns: 1fr;
    padding: 0;
    overflow: hidden;
  }

  .item-image {
    width: 100%;
    height: 200px;
    aspect-ratio: unset;
    object-fit: contain;
    background: var(--neutral-tint);
    border-radius: 0;
  }

  .item-details {
    padding: var(--space-4);
  }
  .item-titre {
    margin-bottom: var(--space-3);
  }
}

@media (max-width: 480px) {
  .panier-titre {
    margin-bottom: var(--space-6);
  }

  .liste-articles .item {
    gap: var(--space-2);
  }

  .resume {
  padding: var(--space-4);
  }
}
</style>
