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

  const authPret = ref(false); 
  const connexion = (data) => {
    user.value = data;
    authPret.value = true; 
  };

  const deconnexion = () => {
    user.value = null;
    authPret.value = true;
    localStorage.removeItem('panier-items');
  };

  const enCoursInscription = ref(false);

  return { user, isConnecte, prenomSeulement, connexion, deconnexion, authPret, enCoursInscription };
});
