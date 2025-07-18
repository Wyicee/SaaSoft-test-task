<script setup lang="ts">
import SsAccount from '@/components/ss-form/ss-account.vue';
import SsForm from '@/components/ss-account/ss-form.vue';
import SsButton from '@/components/ss-button/ss-button.vue';
import block from 'bem-cn-lite';
import { onMounted } from 'vue';
import { useAccountStore } from '@/stores/accountStore.ts';

const accountStore = useAccountStore();

const addForm = () => {
  accountStore.addForm();
};

const deleteForm = (id: number) => {
  accountStore.deleteForm(id);
};

onMounted(() => {
  accountStore.loadFromStorage();

  if (accountStore.forms.length === 0) {
    addForm();
  }
});

const b = block('ss-main-app');
</script>

<template>
  <main :class="b()">
    <ss-account @add-form="addForm">
      <div v-for="form in accountStore.forms" :key="form.id" :class="b('body')">
        <ss-form :form-id="form.id" :form-data="form" />
        <ss-button :class="b('body-delete')" @click="deleteForm(form.id)">Удалить</ss-button>
      </div>
    </ss-account>
  </main>
</template>

<style scoped>
.ss-main-app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.ss-main-app__body {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 18px;
}

:global(.ss-account__body > *:not(:first-child) label) {
  display: none;
}

:global(.ss-account__body > *:not(:first-child) .ss-input__show) {
  top: -18px;
}
</style>