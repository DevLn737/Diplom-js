<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div><label v-if="label" for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ label }}</label>
    <textarea id="message"
              :value="modelValue"
              v-bind="$attrs"
              @input="$emit('update:modelValue', $event.target.value)"
              class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    >

  </textarea></div>


</template>

<style scoped>

</style>