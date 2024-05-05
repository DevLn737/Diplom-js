<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { RouterView } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";


onMounted(() => {
  // Инициализация flowbite.js
  initFlowbite();
});
</script>

<template>
  <TheHeader />
  <main class="min-h-[calc(100vh - 73px)] w-full bg-gray-50 px-4 py-8 sm:p-8 dark:bg-gray-900">
    <RouterView />
  </main>
</template>



