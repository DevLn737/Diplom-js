<script setup>
import {ref} from 'vue';
import axios from 'axios';

const messages = ref([])
const message = ref('')

const
    handleSubmit = async () => {
      try {
        messages.value.push({role: "user", content: message.value})

        const data = {model: "llama3", messages: messages.value, stream: false}
        const response = await axios.post("http://localhost:11434/api/chat", data)
        console.log(response.data.message.content)
        // if (response.status === 200) {
        //   messages.value.push({role: response.data.message.role, content: response.data.message.content})
        //   console.log(response.data.message.role)
        //   console.log(response.data.message.content)
        // }
      } catch
          (error) {
        console.log(error.value)
      }
    }
</script>

<template>
  <main class="max-w-2xl mx-auto pb-5 sm:px-4">

    <footer class="z-10 fixed bottom-0 left-0 right-0 bg-slate-100 border-t-2">
      <div class="container max-w-2xl mx-auto px-5 py-7">
        <form class="w-full flex" @submit.prevent="handleSubmit">
          <input autocomplete="off" autofocus=""
                 class="flex-grow block w-full rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
                 placeholder="Какой радиус окружности земли?" required="" name="prompt" v-model="message"/>
          <button class="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
                  type="submit">
            Чат
          </button>
        </form>
      </div>
    </footer>

    <article class="pb-24">

      <div class="flex gap-x-4 mb-8"><span class="text-xl sm:text-2xl pt-4" title="user">🥸</span>
        <div class=" flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1 p-5 rounded-md"><span
            class="min-w-0">привет</span></div>
      </div>

      <div class="flex gap-x-4 mb-8"><span class="text-xl sm:text-2xl pt-4" title="AI">🦙</span>
        <div class="bg-gray-100 flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1 p-5 rounded-md"><span
            class="min-w-0">Привет! Как я могу помочь вам сегодня?</span></div>
      </div>

    </article>
  </main>
</template>

<style scoped>

</style>