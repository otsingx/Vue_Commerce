import { ref } from 'vue';

export const useFakeStoreApi = () => {
  const produits = ref([]);
  const categories = ref([]);
  const detailsProduit = ref(null);
  const chargement = ref(false);
  const erreur = ref(null);

  const URL_API = 'https://dummyjson.com';

  
  const categoriesMap = {
    'Vêtements femme': 'womens-dresses',
    'Vêtements homme': 'mens-shirts',
    Bijoux: 'womens-jewellery',
    Électronique: 'laptops',
  };


const chargerProduits = async () => {
  chargement.value = true;
 erreur.value = null;
  try {
    const slugs = Object.values(categoriesMap);
    const resultats = await Promise.all(slugs.map((slug) => fetch(`${URL_API}/products/category/${slug}`).then((r) => r.json())));
    produits.value = resultats.flatMap((data) => data.products);
  } catch (err) {
    erreur.value = err.message;
  } finally {
    chargement.value = false;
  }
};

  const chargerCategories = async () => {
    categories.value = Object.keys(categoriesMap);
  };

  const chargerProduitParId = async (id) => {
    chargement.value = true;
    erreur.value = null;
    try {
      const reponse = await fetch(`${URL_API}/products/${id}`);
      if (!reponse.ok) throw new Error('Erreur lors du chargement du produit');
      detailsProduit.value = await reponse.json();
    } catch (err) {
      erreur.value = err.message;
    } finally {
    chargement.value = false;
    }
  };

  const chargerProduitsParCategorie = async (categorieFR) => {
       chargement.value = true;
        erreur.value = null;
    try {
      const slug = categoriesMap[categorieFR];
      const reponse = await fetch(`${URL_API}/products/category/${slug}`);
      if (!reponse.ok) throw new Error('Erreur lors du chargement des produits');
      const data = await reponse.json();
      produits.value = data.products;
    } catch (err) {
      erreur.value = err.message;
    } finally {
      chargement.value = false;
    }
  };

  return {
    produits,
    categories,
    detailsProduit,
    chargement,
    erreur,
    chargerProduits,
    chargerCategories,
    chargerProduitParId,
    chargerProduitsParCategorie,
  };
};
