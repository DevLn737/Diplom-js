<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import BaseInput from "@/components/UI/BaseInput.vue";
import axios from "axios";

const email = ref("");
const username = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    const response = await axios.post("auth/register", {
      email: email.value,
      username: username.value,
      password: password.value,
    });

    if (response.status === 201) {
      await router.push("/login");
    } else if (response.status === 400) {
      alert("Такой пользователь уже существует");
    }
  } catch (error) {
    error.response.data.msg
      ? alert(error.response.data.msg)
      : alert("Произошла ошибка");
    console.error(error);
  }
};
</script>

<template>
  <div
    class="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-10 dark:border-gray-700 dark:bg-gray-800"
  >
    <h2 class="mb-6 text-center text-3xl font-bold dark:text-white">
      Регистрация
    </h2>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div>
        <BaseInput
          label="Имя пользователя"
          type="text"
          v-model="username"
          required
        />
      </div>
      <div>
        <BaseInput label="Почта" type="email" v-model="email" required />
      </div>
      <div>
        <BaseInput label="Пароль" type="password" v-model="password" required />
      </div>
      <div>
        <button
          type="submit"
          class="w-full rounded-md bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 text-white shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Зарегистрироваться
        </button>
      </div>
    </form>

    <div class="mt-4 text-center text-gray-600 dark:text-gray-400">
      Уже зарегистрированы?
      <RouterLink to="/login">
        <span class="text-blue-500 dark:text-blue-400">Войти</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
