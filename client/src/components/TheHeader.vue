<script setup>
import { RouterLink } from "vue-router";
import { logo } from "@/assets";
import ThemeToggler from "@/components/ThemeToggler.vue";
import { useAuthStore } from '@/stores/auth.store';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <header class="sticky top-0 z-50">
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
          <!-- Кнопки для неавторизованного пользователя -->

          <!--          МЕСТО ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ ТЕМЫ-->
          <ThemeToggler />
          <RouterLink :to="{ name: 'stable-diffusion' }">
            <button type="button"
              class="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Создать
            </button>
          </RouterLink>
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
          <button data-collapse-toggle="navbar-cta" type="button"
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
  </header>
</template>

<style scoped></style>
