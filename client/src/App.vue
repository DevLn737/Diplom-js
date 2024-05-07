<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth.store.js";
import axios from "axios";
import TheHeader from "@/components/TheHeader.vue";

const authStore = useAuthStore();

onMounted(async () => {
  // Инициализация flowbite.js
  initFlowbite();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        // Если пользователь не авторизован, или закончился срок токена, выкидываем из системы
        authStore.logout();
      }
      return Promise.reject(error);
    }
  );
});
</script>

<template>
  <TheHeader />
  <main class="min-h-[calc(100vh - 73px)] w-full bg-gray-50 px-4 py-8 sm:p-8 dark:bg-gray-900">
    <RouterView />
  </main>
</template>



