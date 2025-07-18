<script setup lang="ts">
import SsButton from '@/components/ss-button/ss-button.vue';
import block from 'bem-cn-lite';

const emit = defineEmits<{
  addForm: []
}>();

const b = block('ss-account');
</script>

<template>
  <div :class="b()">
    <div :class="b('main')">
      <h1 :class="b('main-title')">Учетные записи</h1>
      <ss-button :class="b('main-button')" @click="emit('addForm')">+</ss-button>
    </div>
    <div :class="b('body')">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ss-account__main {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
}

.ss-account__body {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 18px;
}
</style>