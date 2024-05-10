<script setup>
import GalleryCard from "@/components/HomeGalleryCard.vue";

defineProps({
  posts: {
    type: Array
  }
});
</script>

<template>
  <div
    class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"

  >
    <GalleryCard :_id="post._id" :url="post.url" :description="post.description" :owner="post.owner"
                 v-for="post in posts" :key="post._id" />
  </div>
</template>

<style scoped>

</style>