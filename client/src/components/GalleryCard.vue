<script setup>
import { download } from "@/assets";
import { downloadImage } from "@/utils/index.js";

defineProps({
  _id: { type: String },
  description: { type: String },
  url: { type: String },
  owner: { type: Object },
});
</script>

<template>
  <div class="group relative rounded-xl shadow-md hover:drop-shadow-lg">
    <img
      class="h-auto w-full rounded-xl object-cover"
      :src="url"
      :alt="description"
    />
    <div
      class="absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-[#10131f] p-4 group-hover:flex"
    >
      <p class="overflow-y-auto text-sm text-white">{{ description }}</p>
      <div class="mt-4 flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 object-cover text-xs font-bold text-white"
          >
            {{ owner.username[0] }}
          </div>

          <p class="text-sm text-white">{{ owner.username }}</p>
        </div>

        <button
          type="button"
          @click="downloadImage(_id, url)"
          class="border-none bg-transparent outline-none"
        >
          <img
            :src="download"
            alt="download"
            class="h-6 w-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
