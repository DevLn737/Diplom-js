<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import axios from 'axios'
import BaseInput from "@/components/BaseInput.vue";
import {login} from "@/utils/auth.js";

const username = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    const response = await axios.post('auth/login', {
      username: username.value, password: password.value
    })

    if (response.status === 200) {
      login(response.data.token)
      await router.push('/')
    } else {
      alert("Неверные данные для входа")
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto bg-white p-10 border border-gray-200 rounded-md">
    <h2 class="text-3xl font-bold text-center mb-6">Войти</h2>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <div>
        <BaseInput label="Имя пользователя" v-model="username" type="text" required/>
      </div>
      <div>
        <BaseInput label="Пароль" v-model="password" type="password" required/>
      </div>
      <div>
        <button type="submit"
                class="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Войти
        </button>
      </div>
    </form>

    <div class="mt-4 text-center text-gray-600">
      Ещё не зарегистрированы?
      <RouterLink to="/register">
        <span class="text-blue-500">Присоединяйтесь!</span>
      </RouterLink>
    </div>

  </div>
</template>
