<script setup>
import axios from "axios";
import { FwbTextarea, FwbButton } from "flowbite-vue";
import { preview } from "@/assets";
import Loader from "./UI/Loader.vue";
import { useStableDiffusionStore } from "@/stores";
</script>

<template>
  <!--        Панель генерации        -->
  <div class="rounded-2xl px-6 py-8 shadow shadow-gray-400 dark:shadow-gray-700">
    <div class="flex items-center space-x-4">
      <div class="grow">
        <FwbTextarea v-model="message" label="" required form="generator-form"
          placeholder="Введите описание того, что вы хотите, чтобы искусственный интеллект создал" style="resize: none"
          class="h-[110px] border-purple-500" />
      </div>
      <FwbButton size="xl" class="h-[110px] w-[182px] bg-gradient-to-r from-indigo-500">Генерировать</FwbButton>
    </div>
    <div class="mt-6 flex flex-row flex-wrap justify-between">
      <div class="">
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-solid fa-dice dark:invert"></i>
          </template>
          Случайный запрос
        </FwbButton>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-middle text-sm text-gray-400">Соотношение</span>
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-regular fa-square"></i>
          </template>
          1:1
        </FwbButton>
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-regular fa-square"></i>
          </template>
          2:3
        </FwbButton>
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-regular fa-square"></i>
          </template>
          3:2
        </FwbButton>
      </div>

      <div class="">
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-regular fa-image"></i>
          </template>
          Опубликовать изображение
        </FwbButton>
      </div>

      <div class="">
        <FwbButton outline size="sm" color="dark" class="rounded-xl">
          <template #prefix>
            <i class="fa-solid fa-vials"></i>
          </template>
          For test purpose :)
        </FwbButton>
      </div>
    </div>
  </div>

  <!--        Панель со стилями        -->

  <!--        Изображение        -->
  <div
    class="relative mx-auto mt-6 flex h-[312px] w-[312px] items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-800">
    <img v-if="false" src="" alt="prompt" class="h-full w-full object-contain" />
    <img v-else :src="preview" alt="preview" class="h-9/12 w-9/12 dark:invert" />
    <div v-if="false" class="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
      <Loader />
    </div>
  </div>
</template>
