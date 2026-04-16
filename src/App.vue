<template>
  <div class="app-layout">
    <!-- ← add the wrapper div -->
    <NavBar />
    <main class="app-main">
      <!-- ← wrap RouterView in main -->
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { auth } from './firebase'; //adding
import { onAuthStateChanged } from 'firebase/auth'; //adding
import { useUserStore } from './stores/userStore'; //adding

const userStore = useUserStore(); //adding

// ← restore Firebase session on every page load
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.connexion(user); // ← user still logged in
    } else {
      userStore.deconnexion(); // ← user logged out
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
    margin-bottom: 0; /* ← much less space on mobile */
  }
}
</style>
