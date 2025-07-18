<script setup lang="ts">
import SsInput from '@/components/ss-input/ss-input.vue';
import SsSelect from '@/components/ss-select/ss-select.vue';
import block from 'bem-cn-lite';
import { computed, ref, watch } from 'vue';

import { type FormData, useAccountStore } from '@/stores/accountStore.ts';
import SsButton from '@/components/ss-button/ss-button.vue';

interface FormProps {
  formId: number;
  formData: FormData;
}

const props = defineProps<FormProps>();
const accountStore = useAccountStore();

const useField = <K extends keyof FormData>(field: K) => {
  return computed<string>({
    get: () => String(props.formData[field] ?? ''),
    set: (val: string) => [
      accountStore.updateForm(props.formId, field, val)
    ]
  });
};

const tags = useField('tags');
const type = useField('type');
const login = useField('login');
const password = useField('password');

const showPasswordField = computed(() => type.value === 'local');

watch(type, (newType) => {
  if (newType === 'ldap') {
    accountStore.updateForm(props.formId, 'password', null as any);
  }
});

const errors = ref<Record<string, string>>({});

const rules = {
  tags: (val: string) => val.length <= 50 || 'Максимум 50 символов',
  login: (val: string) => (!!val && val.length <= 100) || 'Логин обязателен и не более 100 символов',
  password: (val: string) => {
    if (type.value === 'ldap') return true;
    return (!!val && val.length <= 100) || 'Пароль обязателен и не более 100 символов';
  }
};

const validateField = (field: keyof FormData, value: string) => {
  const rule = (rules as any)[field];
  if (!rule) return;
  const result = rule(value);
  if (result !== true) {
    errors.value[field] = result;
  } else {
    delete errors.value[field];
  }
};

const validateAndSave = () => {
  validateField('tags', tags.value);
  validateField('login', login.value);
  validateField('password', password.value);

  if (Object.keys(errors.value).length === 0) {
    accountStore.addAccount({
      id: Date.now(),
      tags: tags.value ? tags.value.split(';').map(t => ({ text: t.trim() })) : [],
      type: type.value,
      login: login.value,
      password: type.value === 'local' ? password.value : undefined
    });
    accountStore.deleteForm(props.formId);
  }
};

const b = block('ss-form');
</script>

<template>
  <form :class="b()" @submit.prevent>
    <ss-input :required="false" :aria-required="false" label="Метки" type="text" name="tags" v-model="tags" :error="errors.tags" @blur="() => validateField('tags', tags)" />
    <ss-select :required="false" :aria-required="false" label="Тип записи" v-model="type" @change="() => { validateField('password', password) }" />
    <ss-input label="Логин" type="text" name="login" v-model="login" :error="errors.login" @blur="validateField('login', login)" />
    <ss-input v-if="showPasswordField" label="Пароль" type="password" name="password" password :error="errors.password" v-model="password" @blur="() => validateField('password', password)" />
    <ss-button @click="validateAndSave()">Сохранить</ss-button>
  </form>
</template>

<style scoped>
.ss-form {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>