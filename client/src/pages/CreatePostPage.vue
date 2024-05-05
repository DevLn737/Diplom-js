<script setup>
import { ref } from "vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import Loader from "@/components/Loader.vue";
import { preview } from "@/assets/index.js";
import { downloadImage, getRandomPrompt } from "@/utils/index.js";
import router from "@/router/index.js";
import axios from "axios";


const model = ref("Deliberate v6(SFW)");

const prompt = ref("");
const negativePrompt = ref("");
const image = ref("");

const loading = ref(false);
const isGenerated = ref(false);

// Временная заглушка
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjJmYzY0NzliYWFhMDYwYzVhZTRiZDAiLCJpYXQiOjE3MTQ0MDcwNDQwNzIsImV4cCI6MTcxNDQwOTYzNjA3Mn0.RlFfF54VnYfCC3xqzOcfUBNMpzuooKiSOwOUtlHyWkU";

const generateImage = async () => {
  if (prompt.value && !isGenerated.value) {
    try {
      isGenerated.value = true;
      // Отправляем на backend стандартный негатив, если поле пустое
      const negative = negativePrompt.value ? negativePrompt.value : "[disfigured, poorly drawn], [bad : wrong] anatomy, [extra | missing | floating | disconnected] limb, mutated, blurry";

      // const response = await fetch(
      //   "http://localhost:4000/api/images/generate",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`
      //     },
      //     body: JSON.stringify({ prompt: prompt.value, negative_prompt: negative })
      //   }
      // );
      const response = await axios.post("http://localhost:4000/api/images/generate",
        JSON.stringify({ prompt: prompt.value, negative_prompt: negative }),
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );


      image.value = `data:image/png;base64,${response.data.image}`;
    } catch (error) {
      console.error(error);
    } finally {
      isGenerated.value = false;
    }
  } else {
    alert("Пожалуйста, заполните запрос");
  }
};

const handleSurpriseMe = () => {
  prompt.value = getRandomPrompt(prompt.value);
};
const handleDownloadImage = () => {
  image.value ? downloadImage(prompt.value, image.value) : alert("Сначала сгенерируйте изображения для скачивания");
};

const handleSubmit = async () => {
  if (prompt.value && image.value) {
    loading.value = true;

    try {
      // const response = await fetch(
      //   "http://localhost:4000/api/images/community",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`
      //     },
      //     body: JSON.stringify({
      //       description: prompt.value,
      //       // Удаляем метаданные
      //       image: image.value.split(",")[1]
      //     })
      //   }
      // );
      await axios.post(
        "http://localhost:4000/api/images/community",
        JSON.stringify({ description: prompt.value, image: image.value.split(",")[1] }),
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );

      console.log("Пост успешно опубликован");
      await router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  } else {
    alert("Пожалуйста, введите запрос и сгенерируйте изображение");
  }
};


</script>

<template>
  <section class="mx-auto max-w-7xl">
    <div>
      <h1 class="text-[32px] font-extrabold text-[#222328]">
        Создавай!
      </h1>
      <p class=" max-w-[560px] mt-2 text-[16px] text-[#666375]">
        Создавай творческие и визуально ошеломляющий изображения со Stable
        Diffusion и делись этим с сообществом, либо сохраняй для собственных
        проектов
      </p>
    </div>


    <form class="mt-10" @submit.prevent="">
      <div class="flex gap-6">
        <div class="flex-1 flex-wrap">
          <BaseTextArea v-model="prompt"
                        placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
                        label="Положительный запрос" />
          <BaseTextArea v-model="negativePrompt"
                        placeholder="(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation"
                        label="Отрицательный запрос" />
        </div>
        <!--        Панель генерации        -->
        <div class="flex flex-col gap-2 flex-wrap max-w-[200px]">
          <div
            class="flex justify-between items-center w-full text-[10px] bg-indigo-300 rounded-lg px-2 py-1 overflow-hidden">
            <span class="text-black">Текущая модель</span>
            <b>{{ model }}</b>
          </div>
          <div>
            <button type="button"
                    class="w-[200px] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-6 text-center me-2 mb-2"
                    @click="generateImage"
                    :disabled="isGenerated"
            >
              {{ isGenerated ? "Генерируется..." : "Сгенерировать!" }}
            </button>
          </div>
          <div class="flex justify-between flex-nowrap">
            <button type="button"
                    class="bg-gradient-to-br from-gray-400 to-gray-500 text-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                    title="Случайный положительный запрос"
                    @click="handleSurpriseMe">
              🎲️
            </button>
            <button type="button"
                    class="text-white bg-gradient-to-br from-gray-400 to-gray-500 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    title="Очистить поля запросов">
              🗑️
            </button>
            <button type="button"
                    class="text-white bg-gradient-to-br from-gray-400 to-gray-500 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    title="Сохранить запрос как шаблон">
              💾
            </button>
            <button type="button"
                    class="text-white bg-gradient-to-br from-gray-400 to-gray-500 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    title="Использовать параметры последнего запроса">
              ♻️
            </button>
          </div>
        </div>
      </div>

      <div
        class="relative mt-6 flex h-[312px] w-[312px] items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      >
        <img v-if="image" :src="image" :alt="prompt" class="h-full w-full object-contain" />
        <img v-else :src="preview" alt="preview" class="h-9/12 w-9/12" />

        <div v-if="isGenerated"
             class="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
          <Loader />
        </div>
      </div>

      <div class="mt-5 flex gap-5">
        <button type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                @click="handleDownloadImage"
        >
          Скачать
        </button>


        <button type="submit"
                class="text-white  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                @click.prevent="handleSubmit"
                :disabled="loading"
        >
          <span v-if="loading">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-2 text-white animate-spin"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor" />
            </svg>
            Делимся...</span>
          <span v-else>Поделиться с сообществом</span>
        </button>

      </div>
    </form>
  </section>
</template>

<style scoped>

</style>