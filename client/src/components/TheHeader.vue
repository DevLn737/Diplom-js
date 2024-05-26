<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";
import {
  FwbButton,
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
} from "flowbite-vue";
import ThemeToggler from "@/components/ThemeToggler.vue";
import { useAuthStore } from "@/stores/auth.store";
import { logo } from "@/assets";

const authStore = useAuthStore();

const isScrolled = ref(false);
const theme = ref(localStorage.getItem("color-theme") || "dark");

const updateTheme = () => {
  theme.value = localStorage.getItem("color-theme") || "dark";
};

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push({ name: "home" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  updateTheme();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <!-- <header class="sticky top-0 z-50">
    <nav class="border-gray-200 bg-white dark:bg-gray-900">
      <div class="mx-auto flex w-full flex-wrap items-center justify-between px-4 py-4 shadow-sm dark:shadow-gray-800">
        <RouterLink :to="{ name: 'home' }">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img :src="logo" class="h-10" alt="Logo" />
            <span class="self-center whitespace-nowrap text-lg font-semibold dark:text-white">Stable <span
                class="text-blue-600">Diffusion</span></span>
          </div>
        </RouterLink>

        <div class="flex items-center gap-2 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <ThemeToggler />
          <button v-if="authStore.isLoggedIn" @click="handleLogout" type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Выйти
          </button>
          <RouterLink to="/register" v-else>
            <button type="button" class="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300
              font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700
              dark:focus:ring-green-800">
              Регистрация
            </button>
          </RouterLink>

          <!--          Burger          -->
  <!-- <button data-collapse-toggle="navbar-cta" type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-cta" aria-expanded="false">
            <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-cta">
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            <li>
              <RouterLink :to="{ name: 'home' }">
                <button
                  class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-400 dark:disabled:hover:text-gray-400 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Главная
                </button>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/">
                <button disabled
                  class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-400 dark:disabled:hover:text-gray-400 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  Запрос
                </button>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'llama' }">
                <button
                  class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-400 dark:disabled:hover:text-gray-400 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  LLama
                </button>
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'faq' }">
                <button
                  class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:disabled:text-gray-400 dark:disabled:hover:text-gray-400 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  FAQ
                </button>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header> -->
  <div
    class="header sticky left-0 top-0 z-50 bg-gray-50 dark:bg-gray-900"
    :class="[{ scrolled: isScrolled, dark: theme === 'dark' }]"
  >
    <fwb-navbar class="mx-auto max-w-7xl bg-gray-50 dark:bg-gray-900">
      <template #logo>
        <router-link :to="{ name: 'home' }">
          <fwb-navbar-logo alt="Flowbite logo" :image-url="logo" link="#">
            <span
              class="self-center whitespace-nowrap text-lg font-semibold dark:text-white"
            >
              Stable
              <span class="text-blue-600">Diffusion</span>
            </span>
          </fwb-navbar-logo>
        </router-link>
      </template>

      <template #default="{ isShowMenu }">
        <fwb-navbar-collapse :is-show-menu="isShowMenu">
          <router-link :to="{ name: 'home' }">
            <fwb-navbar-link is-active> Главная </fwb-navbar-link>
          </router-link>

          <router-link :to="{ name: 'llama' }">
            <fwb-navbar-link> AI Ассистент </fwb-navbar-link>
          </router-link>

          <fwb-navbar-link disabled> Блок </fwb-navbar-link>
        </fwb-navbar-collapse>
      </template>

      <template #right-side>
        <div class="flex items-center">
          <ThemeToggler @click="updateTheme" class="me-3" />

          <div class="flex gap-2" v-if="!authStore.isLoggedIn">
            <router-link :to="{ name: 'login' }">
              <fwb-button color="dark" outline class="rounded">
                Войти
              </fwb-button>
            </router-link>

            <router-link :to="{ name: 'register' }">
              <fwb-button
                class="rounded border-[1px] border-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-500"
              >
                Начать
              </fwb-button>
            </router-link>
          </div>

          <div v-else>
            <fwb-button
              @click="handleLogout"
              gradient="purple-pink"
              class="rounded border-[1px] border-transparent"
            >
              Выйти
            </fwb-button>
          </div>
        </div>
      </template>
    </fwb-navbar>
  </div>
</template>

<style scoped>
.header {
  transition:
    background-color 0.3s,
    border-bottom 0.3s,
    backdrop-filter 0.3s;
}

.header.scrolled {
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header.scrolled.dark {
  background-color: rgb(17, 24, 39);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
