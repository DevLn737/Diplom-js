<script setup>
import StableDiffusionForm from "@/components/StableDiffusionForm.vue";
</script>

<template>
  <section class="mx-auto max-w-7xl">
    <div>
      <h1 class="text-dark text-[32px] font-extrabold dark:text-gray-200">
        Создавай!
      </h1>
      <p class="mt-2 max-w-[560px] text-[16px] text-gray-700 dark:text-gray-400">
        Создавайте собственные изображения по текстовому описанию с помощью
        нашего сервиса силами ИИ. Простое использование вместе с тонкой
        настройкой и множество вариаций стилей помогут раскрыть ваш творческий
        потенциал
      </p>
    </div>
    <StableDiffusionForm />
  </section>
</template>

<style scoped></style>
