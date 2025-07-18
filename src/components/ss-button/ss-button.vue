<script setup lang="ts">
import block from 'bem-cn-lite';

const b = block('ss-button')
</script>

<template>
  <button :class="b()" type="button">
    <slot />
  </button>
</template>

<style scoped>
.ss-button {
  padding: 4px 8px;
  border: 1px solid #000;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
}
</style>