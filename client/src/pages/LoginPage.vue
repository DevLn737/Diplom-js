<script setup>
import { ref } from "vue";
import router from "@/router";
import axios from "axios";
import BaseInput from "@/components/UI/BaseInput.vue";
import { login } from "@/utils/auth.js";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    const response = await axios.post("auth/login", {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200) {
      login(response.data.token);
      // !Костыль, переделать после нормальной системы авторизации
      authStore.isLoggedIn = true;
      await router.push("/");
    } else {
      alert("Неверные данные для входа");
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg);
  }
};
</script>

<template>
  <div
    class="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-10 dark:border-gray-700 dark:bg-gray-800"
  >
    <h2 class="mb-6 text-center text-3xl font-bold dark:text-white">Войти</h2>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div>
        <BaseInput
          label="Имя пользователя"
          v-model="username"
          type="text"
          required
        />
      </div>
      <div>
        <BaseInput label="Пароль" v-model="password" type="password" required />
      </div>
      <div>
        <button
          type="submit"
          class="w-full rounded-md bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 text-white shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Войти
        </button>
      </div>
    </form>

    <div class="mt-4 text-center text-gray-600 dark:text-gray-400">
      Ещё не зарегистрированы?
      <RouterLink to="/register">
        <span class="text-blue-500 dark:text-blue-400">Присоединяйтесь!</span>
      </RouterLink>
    </div>
  </div>
</template>
