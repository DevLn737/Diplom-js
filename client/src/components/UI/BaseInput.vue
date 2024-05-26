<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <label
    v-if="label"
    for="default-input"
    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >{{ label }}</label
  >
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    id="default-input"
    class="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  />
</template>
