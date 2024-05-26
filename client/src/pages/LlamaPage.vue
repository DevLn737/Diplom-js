<script setup>
import { ref } from "vue";
import { nextTick } from "vue";
import axios from "axios";
import Loader from "@/components/Loader.vue";

const messages = ref([]);
const message = ref("");
const loading = ref(false);
const chatMessages = ref([]); // Добавляем ссылку на последнее сообщение

// Костыль
let messageCounter = 0;

const handleSubmit = async () => {
  try {
    scrollToBottom();
    loading.value = true;
    messages.value.push({ role: "user", content: message.value });

    // Очищаем ввод
    message.value = "";

    const data = {
      model: "llama3",
      messages: messages.value,
      stream: false,
      keep_alive: "2400m",
    };
    const response = await axios.post("llama/chat", JSON.stringify(data));

    console.log(response);

    if (response.status === 200) {
      // Добавляем ответ бота в память
      messages.value.push({
        role: response.data.message.role,
        content: response.data.message.content,
      });
    }
    loading.value = false;

    // Ждём обновления vdom, чтобы получить доступ к текущему последнему сообщению
    await nextTick();
    scrollToBottom();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

// Функция для прокрутки страницы вниз
const scrollToBottom = () => {
  // Костыль чтобы сразу не скролил
  messageCounter += 1;
  console.log(messageCounter);
  if (messageCounter > 4) {
    const lastMessage = chatMessages.value[chatMessages.value.length - 1];
    lastMessage.scrollIntoView();
    console.log("scrolled!");
  }
};
</script>

<template>
  <main class="mx-auto max-w-2xl pb-5 sm:px-4">
    <h2 class="mb-6 text-center text-[32px] font-bold dark:text-gray-200">
      Llama3 7B
    </h2>

    <footer
      class="border-t-1 fixed bottom-0 left-0 right-0 z-10 bg-slate-100 dark:bg-gray-800"
    >
      <div class="container mx-auto max-w-2xl px-5 py-7">
        <form class="flex w-full" @submit.prevent="handleSubmit">
          <input
            autocomplete="off"
            autofocus=""
            class="sm:leading-6dark:bg-gray-700 block w-full flex-grow rounded-l-md border-0 px-3 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Как рассчитать площадь окружности?"
            required=""
            name="prompt"
            v-model="message"
          />
          <button
            class="items-center rounded-r-md bg-gray-600 px-5 py-3 font-semibold text-white hover:bg-gray-800 dark:hover:bg-gray-500"
            type="submit"
            v-if="!loading"
          >
            Чат
          </button>
          <button
            class="items-center rounded-r-md bg-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-800"
            v-else
            disabled
          >
            Думает...
          </button>
        </form>
      </div>
    </footer>

    <article class="pb-24">
      <div
        class="mb-8 flex gap-x-4"
        v-for="(message, index) in messages"
        :key="index"
        ref="chatMessages"
      >
        <span class="pt-4 text-xl sm:text-2xl" :title="message.role">{{
          message.role === "user" ? "😀" : "🦙"
        }}</span>
        <div
          :class="[
            'flex',
            'flex-col',
            'text-sm',
            'sm:text-base',
            'flex-1',
            'gap-y-4',
            'mt-1',
            'p-5',
            'dark:text-white',
            'rounded-lg',
            'shadow-md',
            'dark:shadow',
            'dark:shadow-slate-400',
            {
              'bg-gray-100 dark:bg-gray-600': message.role === 'user',
              'bg-gray-200 dark:bg-gray-700': message.role === 'assistant',
            },
          ]"
        >
          <span class="min-w-0">{{ message.content }} </span>
        </div>
      </div>

      <div class="flex justify-center" v-if="loading">
        <Loader />
      </div>
    </article>
  </main>
</template>

<style scoped></style>
