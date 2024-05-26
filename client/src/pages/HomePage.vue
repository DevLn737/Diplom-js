<script setup>
import Gallery from "@/components/Gallery.vue";
import StableDiffusionForm from "@/components/GeneratorForm.vue";
import { FwbImg } from "flowbite-vue";
</script>

<template>
  <section class="mx-auto mt-10 max-w-7xl">
    <div class="col-md-10 col-lg-9 col-xxl-10 text-center">
      <h1
        class="text-dark sm-[1.5rem] mb-4 font-extrabold capitalize dark:text-gray-200 md:text-[3.15rem] lg:text-[4rem]"
        style="perspective: 400px">
        AI контент платформа
        <br />
        <span class="bg-gradient-to-r from-[#6a41fb] to-[#f49957] bg-clip-text text-transparent">
          Генерация изображений
        </span>
        <br />
        <span class="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Умный Ассистент</span>
      </h1>
      <p class="mx-auto mt-2 max-w-[800px] text-lg font-bold text-gray-600 dark:text-gray-400">
        Ваше универсальное решение для создания контента. Исследуйте магию
        создания произведений искусства с помощью искусственного интеллекта -
        создавайте шедевры за считанные секунды
      </p>
    </div>
  </section>

  <section
    class="mx-auto mt-16 max-w-7xl">
    <StableDiffusionForm />
  </section>

  <section class="mx-auto mt-16 max-w-7xl">
    <div class="mx-auto max-w-4xl">
      <h1 class="text-center text-[32px] font-extrabold text-[#222328] dark:text-gray-100">
        Витрина сообщества
      </h1>
      <p class="mt-2 text-[16px] text-[#666e75] dark:text-gray-400">
        Продолжите свое увлекательное путешествие в мире искусства и инноваций в
        нашей галерее сообщества, где каждое изображение представляет собой
        уникальное творение, созданное силами искусственного интеллекта.
        Погрузитесь в мир красоты и вдохновения, который оживляется благодаря
        синтезу технологии и творчества.
      </p>
    </div>
    <div class="mt-10">
      <Gallery />
    </div>
  </section>

  <section class="mx-auto mt-16 max-w-7xl">
    <div class="flex items-center justify-between gap-16">
      <FwbImg src="https://ucarecdn.com/84b7e94b-377f-4579-a00f-6a93cab402c0/-/preview/500x500/"
        class="object-fit basis-1/2 sm:h-[300px] sm:sm:basis-1 md:h-[400px] lg:h-[500px]" />
      <div class="basis-1/2">
        <h2 class="mb-4 text-[40px] font-semibold text-gray-800 dark:text-gray-50 sm:text-[26px] md:text-[32px]">
          AI генератор изображения из текста
        </h2>
        <div class="mb-6 text-gray-400 sm:basis-1 sm:text-[14px] md:text-[16px]">
          Воплотите свои идеи в жизнь с помощью AI art generator. Просто
          опишите, что вы хотите, чтобы создал искусственный интеллект, измените
          настройки и наблюдайте, как Artguru всего за несколько секунд
          превращает ваши слова в потрясающие изображения, созданные с помощью
          искусственного интеллекта.
        </div>
        <div
          class="min-h-[170px] w-full rounded-xl bg-[#f2f2f2] p-10 text-justify text-[16px] font-normal text-[#4a4b65] dark:bg-gray-200"
          style="font-family: Sriracha">
          a beautiful girl with flowered hairs, centered, cherry blossom, goth
          style, acrylic color painting, highly detailed face, art by Banksy and
          carne griffiths and Agnes Cecile, dark vibrant, trending on
          artstation, hd, 4k, 8k, extreamly high resolution
        </div>
      </div>
    </div>
  </section>
</template>
