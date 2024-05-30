<script setup>
import { ref } from "vue"
import axios from "axios";
import { FwbTextarea, FwbButton } from "flowbite-vue";
import { preview } from "@/assets";
import Loader from "@/components/UI/Loader.vue";
import { useStableDiffusionStore } from "@/stores"
import { downloadImage } from "@/utils/misc";
import { isLogin } from "@/utils/auth";

const stableDiffusionStore = useStableDiffusionStore();

const loading = ref(false)

const handleDownloadImage = () => {
  stableDiffusionStore.image ? downloadImage(stableDiffusionStore.prompt, stableDiffusionStore.image) : alert("Сначала сгенерируйте изображения для скачивания");
};

const handleSubmit = async () => {
  if (stableDiffusionStore.prompt && stableDiffusionStore.image) {
    if (isLogin()) {
      loading.value = true;

      try {
        await axios.post(
          "images/community",
          JSON.stringify({ description: stableDiffusionStore.prompt, image: stableDiffusionStore.image.split(",")[1] }));


        console.log("Пост успешно опубликован");
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
    else {
      alert("Чтобы публиковать изображения, пожалуйста зарегистрируйтесь")
    }
  } else {
    alert("Пожалуйста, введите запрос и сгенерируйте изображение");
  }
};

const generateImage = async () => {
  if (stableDiffusionStore.prompt && !stableDiffusionStore.isGenerated) {
    try {
      stableDiffusionStore.isGenerated = true;
      // Отправляем на backend стандартный негатив, если поле пустое
      const negative = stableDiffusionStore.negativePrompt ? stableDiffusionStore.negativePrompt : "[disfigured, poorly drawn], [bad : wrong] anatomy, [extra | missing | floating | disconnected] limb, mutated, blurry";

      const response = await axios.post("images/generate",
        JSON.stringify({ prompt: stableDiffusionStore.prompt, negative_prompt: negative }));

      stableDiffusionStore.setImage(`data:image/png;base64,${response.data.image}`);

    } catch (error) {
      console.error(error);
    } finally {
      stableDiffusionStore.isGenerated = false;
    }
  } else {
    alert("Пожалуйста, заполните запрос");
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!--        Панель генерации        -->
    <div class="rounded-2xl px-6 py-8 shadow shadow-gray-400 dark:shadow-gray-700">
      <div class="flex items-center space-x-4">
        <div class="grow">
          <FwbTextarea v-model="stableDiffusionStore.prompt" label="" required form="generator-form"
            placeholder="Введите описание того, что вы хотите, чтобы искусственный интеллект создал"
            style="resize: none" class="h-[110px] border-purple-500" />
        </div>
        <FwbButton size="xl" class="h-[110px] w-[182px] bg-gradient-to-r from-indigo-500" @click="generateImage"
          type="button">
          Генерировать</FwbButton>
      </div>
      <div class="mt-6 flex flex-row flex-wrap justify-between">
        <div class="">
          <FwbButton outline size="sm" color="dark" class="rounded-xl" @click="stableDiffusionStore.getRandomPrompt"
            type="button">
            <template #prefix>
              <i class="fa-solid fa-dice dark:invert"></i>
            </template>
            Случайный запрос
          </FwbButton>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-middle text-sm text-gray-400">Соотношение</span>
          <FwbButton outline size="sm" color="dark" class="rounded-xl" type="button">
            <template #prefix>
              <i class="fa-regular fa-square"></i>
            </template>
            1:1
          </FwbButton>
          <FwbButton outline size="sm" color="dark" class="rounded-xl" type="button">
            <template #prefix>
              <i class="fa-regular fa-square"></i>
            </template>
            2:3
          </FwbButton>
          <FwbButton outline size="sm" color="dark" class="rounded-xl" type="button">
            <template #prefix>
              <i class="fa-regular fa-square"></i>
            </template>
            3:2
          </FwbButton>
        </div>

        <div>
          <FwbButton outline size="sm" color="dark" class="rounded-xl" :loading="loading" type="submit">
            <template #prefix>
              <i class="fa-regular fa-image"></i>
            </template>
            Опубликовать изображение
          </FwbButton>
        </div>

        <div class="">
          <FwbButton outline size="sm" color="dark" class="rounded-xl" @click="handleDownloadImage" type="button">
            <template #prefix>
              <i class="fa-solid fa-vials"></i>
            </template>
            Скачать изображение
          </FwbButton>
        </div>
      </div>
    </div>


    <div
      class="relative mx-auto mt-6 flex h-[312px] w-[312px] items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-800">
      <img v-if="stableDiffusionStore.image" :src="stableDiffusionStore.image" :alt="stableDiffusionStore.prompt"
        class="h-full w-full object-contain" />
      <img v-else :src="preview" alt="preview" class="h-9/12 w-9/12 dark:invert" />
      <div v-if="stableDiffusionStore.isGenerated"
        class="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
        <Loader />
      </div>
    </div>
  </form>

</template>
