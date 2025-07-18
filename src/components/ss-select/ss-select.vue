<script setup lang="ts">
import block from 'bem-cn-lite';
import { ref, useId, watch } from 'vue';

interface SelectProps {
  label?: string;
  modelValue?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: 'local',
});

const emit = defineEmits<{
  'update:modelValue': [ string ]
}>();

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const handleChange = (event: Event) => {
  localValue.value = (event.target as HTMLSelectElement).value;
};

const id = useId();
const b = block('ss-select');
</script>

<template>
  <div :class="b()">
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :class="b('select')"
      :value="localValue"
      @change="handleChange"
    >
      <option value="local">Локальная</option>
      <option value="ldap">LDAP</option>
    </select>
  </div>
</template>

<style scoped>
.ss-select {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 6px;

  .ss-select__select {
    height: 30px;
  }
}
</style>