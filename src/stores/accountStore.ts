import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface AccountStore {
  id: number;
  tags: Array<{ text: string }>;
  type: string;
  login: string;
  password?: string;
}

export interface FormData {
  id: number;
  tags: string;
  type: string;
  login: string;
  password?: string;
}

export const useAccountStore = defineStore('accountStore', () => {
  const FORMS_KEY = 'accountForms';
  const accounts = ref<AccountStore[]>([]);
  const forms = ref<FormData[]>([]);
  const nextFormId = ref<number>(0);

  const addForm = () => {
    const newForm: FormData = {
      id: nextFormId.value++,
      tags: '',
      type: 'local',
      login: '',
      password: '',
    };
    forms.value.push(newForm);
    saveToStorage();
    return newForm.id;
  };

  const updateForm = (formId: number, field: keyof FormData, value: string) => {
    const form = forms.value.find(f => f.id === formId);
    if (form) {
      (form as any)[field] = value;
      saveToStorage();
    }
  };

  const deleteForm = (formId: number) => {
    const index = forms.value.findIndex(f => f.id === formId);
    if (index !== -1) {
      forms.value.splice(index, 1);
      saveToStorage();
    }
  };

  const addAccount = (accountData: AccountStore) => {
    accounts.value.push(accountData);
    saveToStorage();
  };

  const deleteAccount = (id: number) => {
    const index = accounts.value.findIndex(account => account.id === id);
    if (index !== -1) {
      accounts.value.splice(index, 1);
      saveToStorage();
    }
  };

  const saveToStorage = () => {
    localStorage.setItem('accountStore', JSON.stringify({
      accounts: accounts.value,
      forms: forms.value,
      nextFormId: nextFormId.value
    }));
  };

  const loadFromStorage = () => {
    const saved = localStorage.getItem(FORMS_KEY);
    if (saved) {
      forms.value = JSON.parse(saved);
    }
  };
  loadFromStorage();

  watch(forms, (newForms) => {
    localStorage.setItem(FORMS_KEY, JSON.stringify(newForms));
  }, { deep: true });

  return {
    accounts,
    forms,
    nextFormId,
    addForm,
    updateForm,
    deleteForm,
    addAccount,
    deleteAccount,
    loadFromStorage,
  };
});
