import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);

  const isConnecte = computed(() => user.value !== null);

  const prenomSeulement = computed(() => {
    if (!user.value?.displayName) return '';

    const prenom = user.value.displayName.split(' ')[0];

    return prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase();
  });

  const connexion = (data) => {
    user.value = data;
  };

  const deconnexion = () => {
    user.value = null;
     localStorage.removeItem('panier-items');
  };

  return { user, isConnecte, prenomSeulement, connexion, deconnexion };
});
