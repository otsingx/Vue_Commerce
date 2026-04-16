import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const usePanierStore = defineStore('panier', () => {
  const savedItems = localStorage.getItem('panier-items');
  const items = ref(savedItems ? JSON.parse(savedItems) : []);

  const message = ref('');

  watch(
    items,
    (newItems) => {
      localStorage.setItem('panier-items', JSON.stringify(newItems));
    },
    { deep: true },
  );

  const ajouter = (produit) => {
    const item = items.value.find((i) => i.id === produit.id);
    if (item) {
      item.quantity++;
    } else {
      items.value.push({
        id: produit.id,
        title: produit.title,
        price: produit.price,
        image: produit.thumbnail || produit.image,
        description: produit.description,
        quantity: 1,
      });
    }
    message.value = 'Article ajouté au panier !';
    setTimeout(() => {
      message.value = '';
    }, 3000);
  };

  const retirer = (id) => {
    const item = items.value.find((i) => i.id === id);
    if (!item) return;
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      items.value = items.value.filter((produit) => produit.id !== id);
    }
  };

  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));
  const sousTotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0));
  const taxes = computed(() => sousTotal.value * 0.15);
  const total = computed(() => sousTotal.value + taxes.value);

  const vider = () => {
    items.value = [];
    localStorage.removeItem('panier-items');
  };
  return {
    items,
    ajouter,
    retirer,
    vider,
    totalItems,
    sousTotal,
    taxes,
    total,
    message,
  };
});
