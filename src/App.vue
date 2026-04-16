<template>
  <div class="app-layout">
    <NavBar />
    <main class="app-main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStore } from './stores/userStore';

const userStore = useUserStore();

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (userStore.enCoursInscription) return;
      await user.reload();
      const freshUser = auth.currentUser;
      userStore.connexion(freshUser);
    } else {
      userStore.deconnexion();
    }
  });
});
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  margin-bottom: var(--space-16);
  padding-top: 0;
}
@media (max-width: 768px) {
  .app-main {
    padding-bottom: var(--space-4);
    margin-bottom: 0;
  }
}
</style>
