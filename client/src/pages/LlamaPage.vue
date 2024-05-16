<script setup>
import { ref } from 'vue';
import { nextTick } from 'vue';
import axios from 'axios';
import Loader from "@/components/Loader.vue";

const messages = ref([])
const message = ref('')
const loading = ref(false)
const chatMessages = ref([]); // Добавляем ссылку на последнее сообщение


// Костыль
let messageCounter = 0

const handleSubmit = async () => {
  try {
    scrollToBottom()
    loading.value = true
    messages.value.push({ role: "user", content: message.value })

    // Очищаем ввод
    message.value = ""

    const data = { model: "llama3", messages: messages.value, stream: false, keep_alive: "2400m" }
    const response = await axios.post("llama/chat", JSON.stringify(data));

    console.log(response);

    if (response.status === 200) {
      // Добавляем ответ бота в память
      messages.value.push({ role: response.data.message.role, content: response.data.message.content })
    }
    loading.value = false

    // Ждём обновления vdom, чтобы получить доступ к текущему последнему сообщению
    await nextTick();
    scrollToBottom()
  } catch
  (error) {
    console.log(error)
  }
  finally {
    loading.value = false
  }
}

// Функция для прокрутки страницы вниз
const scrollToBottom = () => {
  // Костыль чтобы сразу не скролил
  messageCounter += 1
  console.log(messageCounter);
  if (messageCounter > 4) {
    const lastMessage = chatMessages.value[chatMessages.value.length - 1]
    lastMessage.scrollIntoView();
    console.log("scrolled!");
  }
}
</script>

<template>
  <main class="max-w-2xl mx-auto pb-5 sm:px-4">
    <h2 class="text-center font-bold text-[32px]">Llama чат</h2>

    <footer class="z-10 fixed bottom-0 left-0 right-0 bg-slate-100 border-t-2">
      <div class="container max-w-2xl mx-auto px-5 py-7">
        <form class="w-full flex" @submit.prevent="handleSubmit">
          <input autocomplete="off" autofocus=""
            class="flex-grow block w-full rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:leading-6"
            placeholder="Как рассчитать площадь окружности?" required="" name="prompt" v-model="message" />
          <button class="bg-gray-600 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
            type="submit" v-if="!loading">
            Чат
          </button>
          <button class="bg-gray-700 hover:bg-gray-800 items-center font-semibold text-white rounded-r-md px-5 py-3"
            v-else disabled>
            Думает...
          </button>
        </form>
      </div>
    </footer>

    <article class="pb-24">

      <div class="flex gap-x-4 mb-8" v-for="(message, index) in messages" :key="index" ref="chatMessages">
        <span class="text-xl sm:text-2xl pt-4" :title="message.role">{{ message.role === "user" ? "😀" : "🦙" }}</span>
        <div
          :class="['flex', 'flex-col', 'text-sm', 'sm:text-base', 'flex-1', 'gap-y-4', 'mt-1', 'p-5', 'rounded-md', { 'bg-gray-100': message.role === 'user', 'bg-gray-200': message.role === 'assistant' }]">
          <span class="min-w-0">{{ message.content }}
          </span>
        </div>
      </div>

      <div class="flex justify-center" v-if="loading">
        <Loader />
      </div>

    </article>
  </main>
</template>

<style scoped></style>