<script setup>
import BaseTextArea from "@/components/BaseTextArea.vue";
import {useStableDiffusionStore} from '@/stores/stableDiffusion.store.js'
const stableDiffusionStore = useStableDiffusionStore()
</script>

<template>
  <div class="flex-1 flex-wrap">
    <BaseTextArea v-model="stableDiffusionStore.prompt"
                  placeholder="a fortune-telling shiba inu reading your fate in a giant hamburger, digital art"
                  label="Положительный запрос"/>
    <BaseTextArea v-model="stableDiffusionStore.negativePrompt"
                  placeholder="(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation"
                  label="Отрицательный запрос"/>
  </div>
</template>
