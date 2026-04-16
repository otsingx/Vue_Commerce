<template>
  <div :class="['boite-message', type]">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  type: {
    type: String,
    default: 'info',
  },
});
</script>

<style scoped>
.boite-message {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 600;
  margin: var(--space-4) auto;
  text-align: center;
  box-shadow: var(--shadow-sm);
  font-family: var(--font-family);
  max-width: 480px;            
  word-break: break-word;
}
.boite-message.succes {
  border: 2px solid var(--success-color);
  color: var(--success-color);
}

.boite-message.erreur {
  border: 2px solid var(--error-color);
  color: var(--error-color);
}

.boite-message.info {
  border: 2px solid var(--info-color);
  color: var(--info-color);
}

@media (max-width: 480px) {
  .boite-message {
    max-width: 90%;             
    font-size: var(--font-size-sm);
    padding: var(--space-3);
  }
}
</style>
