<script setup>
import axios from "axios";
import {useStableDiffusionStore} from "@/stores/stableDiffusion.store.js";
import {getToken} from "@/utils/auth.js"

const stableDiffusionStore = useStableDiffusionStore();
// Заглушка, модель пока что не меняется
stableDiffusionStore.setModel("Deliberate V6(SFW)")

const token = getToken()

const generateImage = async () => {
  if (stableDiffusionStore.prompt && !stableDiffusionStore.isGenerated) {
    try {
      stableDiffusionStore.isGenerated = true;
      // Отправляем на backend стандартный негатив, если поле пустое
      const negative = stableDiffusionStore.negativePrompt ? stableDiffusionStore.negativePrompt : "[disfigured, poorly drawn], [bad : wrong] anatomy, [extra | missing | floating | disconnected] limb, mutated, blurry";

      const response = await axios.post("images/generate",
          JSON.stringify({prompt: stableDiffusionStore.prompt, negative_prompt: negative}),
          {headers: {Authorization: `Bearer ${token}`}}
      );

      stableDiffusionStore.setImage(`data:image/png;base64,${response.data.image}`);

    } catch (error) {
      console.error(error);
    } finally {
      stableDiffusionStore.isGenerated = false;
    }
  } else {
    alert("Пожалуйста, заполните запрос");
  }
};
</script>

<template>
  <!--        Панель генерации        -->
  <div class="flex flex-col gap-2 flex-wrap max-w-[200px]">
    <div
        class="flex justify-between items-center w-full text-[10px] bg-indigo-300 rounded-lg px-2 py-1 ">
      <span class="text-black">Текущая модель</span>
      <b>{{ stableDiffusionStore.model }}</b>
    </div>
    <div>
      <button type="button"
              class="w-[200px] text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-6 text-center me-2 mb-2"
              @click="generateImage"
              :disabled="stableDiffusionStore.isGenerated"
      >
        {{ stableDiffusionStore.isGenerated ? "Генерируется..." : "Сгенерировать!" }}
      </button>
    </div>
    <div class="flex justify-between flex-nowrap">
      <button type="button"
              class="bg-gradient-to-br from-gray-400 to-gray-500 text-white font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
              title="Случайный положительный запрос"
              @click="stableDiffusionStore.setRandomPrompt()">
        🎲️
      </button>
      <button type="button"
              class="text-white bg-gradient-to-br from-gray-400 to-gray-500 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              title="Очистить поля запросов"
              @click="stableDiffusionStore.clearPrompt()"
      >
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
</template>
