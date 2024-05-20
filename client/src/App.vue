<script setup>
import {onMounted} from "vue";
import {RouterView} from "vue-router";
import {initFlowbite} from "flowbite";
import TheHeader from "@/components/TheHeader.vue";

onMounted(async () => {
  initFlowbite();
});
</script>

<template>
  <TheHeader/>
  <main class="h-[100vh] w-full bg-gray-50 px-4 py-6 sm:p-8 dark:bg-gray-900">
    <RouterView/>
  </main>
</template>



