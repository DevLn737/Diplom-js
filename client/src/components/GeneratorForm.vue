<script setup>
import axios from "axios";
import { ref } from "vue";

import StableDiffusionControlPanel from "@/components/GeneratorControl.vue";
import GeneratorControl from "@/components/GeneratorControl.vue";
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <!--    ПАНЕЛЬКА ПОЛНОСТЬЮ С НАСТРОЙКАМИ ПАРАМЕТРОВ ГЕНЕРАЦИИ    -->
    <GeneratorControl />
    <!-- <StableDiffusionControlPanel /> -->
  </form>
</template>
