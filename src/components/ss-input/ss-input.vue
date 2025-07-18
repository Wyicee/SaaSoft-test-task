<script setup lang="ts">
import block from 'bem-cn-lite';
import { computed, ref, useId, watch } from 'vue';

interface InputProps {
  type?: string;
  placeholder?: string;
  error?: string;
  label?: string;
  modelValue?: string | number;
  required?: boolean;
  password?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  required: true,
  password: false,
});

const emit = defineEmits<{
  'update:modelValue': [ string | number ]
}>();

const localValue = ref(props.modelValue ?? '');
const showPassword = ref(false);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const realType = computed(() => {
  if (props.password) {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const toggleEye = () => {
  showPassword.value = !showPassword.value;
};

const formShowHideText = computed(() =>
  showPassword.value ? 'Скрыть' : 'Показать'
);

const id = useId();
const b = block('ss-input');
</script>

<template>
  <div :class="b()">
    <label v-if="label" :class="b('label')" :for="id" v-html="label" />
    <input
      :id="id"
      :class="b('input')"
      :type="realType"
      :placeholder="placeholder"
      v-model="localValue"
      :required="required"
      :aria-required="required"
      autocomplete="on"
    />
    <span v-if="password && localValue" :class="b('show')" @click="toggleEye">{{ formShowHideText }}</span>
    <small v-if="error" :class="b('error')" v-html="error" />
  </div>
</template>

<style scoped>
.ss-input {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 6px;
  position: relative;

  .ss-input__input {
    height: 25px;
  }

  .ss-input__show {
    cursor: pointer;
    position: absolute;
    right: 15px;
  }
}
</style>