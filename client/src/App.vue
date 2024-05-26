<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { initFlowbite } from "flowbite";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
onMounted(async () => {
  initFlowbite();
});
</script>

<template>
  <TheHeader />
  <main class="min-h-[100vh] bg-gray-50 px-4 py-6 dark:bg-gray-900 sm:p-8">
    <RouterView />
  </main>
  <TheFooter />
</template>
