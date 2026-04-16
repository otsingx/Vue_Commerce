import { ref } from 'vue';

export const useFakeStoreApi = () => {
  const produits = ref([]);
  const categories = ref([]);
  const detailsProduit = ref(null);
  const chargement = ref(false);
    const afficherChargement = ref(false); //add
  const erreur = ref(null);

  const URL_API = 'https://dummyjson.com';

  
  const categoriesMap = {
    'Vêtements femme': 'womens-dresses',
    'Vêtements homme': 'mens-shirts',
    Bijoux: 'womens-jewellery',
    Électronique: 'laptops',
  };


  //add
    let timerChargement = null;

    const debutChargement = () => {
      chargement.value = true;
      afficherChargement.value = false;
      erreur.value = null;

      timerChargement = setTimeout(() => {
        if (chargement.value) {
          afficherChargement.value = true;
        }
      }, 250);
    };

    const finChargement = () => {
      chargement.value = false;
      afficherChargement.value = false;

      if (timerChargement) {
        clearTimeout(timerChargement);
        timerChargement = null;
      }
    }; 
    //add

const chargerProduits = async () => {
    debutChargement();//add
  //chargement.value = true;
 // erreur.value = null;
  try {
    const slugs = Object.values(categoriesMap);
    const resultats = await Promise.all(slugs.map((slug) => fetch(`${URL_API}/products/category/${slug}`).then((r) => r.json())));
    produits.value = resultats.flatMap((data) => data.products);
  } catch (err) {
    erreur.value = err.message;
  } finally {
     finChargement();//add
    //chargement.value = false;
  }
};

  const chargerCategories = async () => {
    categories.value = Object.keys(categoriesMap);
  };

  const chargerProduitParId = async (id) => {
      debutChargement();//add
    //chargement.value = true;
    //erreur.value = null;
    try {
      const reponse = await fetch(`${URL_API}/products/${id}`);
      if (!reponse.ok) throw new Error('Erreur lors du chargement du produit');
      detailsProduit.value = await reponse.json();
    } catch (err) {
      erreur.value = err.message;
    } finally {
       finChargement();
      //chargement.value = false;
    }
  };

  const chargerProduitsParCategorie = async (categorieFR) => {
      debutChargement();//add
    //chargement.value = true;
   // erreur.value = null;
    try {
      const slug = categoriesMap[categorieFR];
      const reponse = await fetch(`${URL_API}/products/category/${slug}`);
      if (!reponse.ok) throw new Error('Erreur lors du chargement des produits');
      const data = await reponse.json();
      produits.value = data.products;
    } catch (err) {
      erreur.value = err.message;
    } finally {
       finChargement();//add
      //chargement.value = false;
    }
  };

  return {
    produits,
    categories,
    detailsProduit,
    chargement,
    afficherChargement, //add
    erreur,
    chargerProduits,
    chargerCategories,
    chargerProduitParId,
    chargerProduitsParCategorie,
  };
};
