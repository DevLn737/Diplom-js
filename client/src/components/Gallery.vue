<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import GallerySearchField from "@/components/GallerySearchField.vue";
import GalleryGrid from "@/components/GalleryGrid.vue";
import Loader from "@/components/Loader.vue";


const loading = ref(false);
const allPosts = ref([]);

const searchText = ref("");
const searchedResults = ref([]);
const searchTimeout = ref(null);


const handleSearchChange = () => {
  clearTimeout(searchTimeout.value);

  searchTimeout.value = setTimeout(async () => {
    const searchResultByUsername = allPosts.value.filter((post) =>
      post.owner.username.toLowerCase().includes(searchText.value.toLowerCase())
    );

    const searchResultByDescription = allPosts.value.filter((post) =>
      post.description.toLowerCase().includes(searchText.value.toLowerCase())
    );

    searchedResults.value = searchResultByUsername.concat(searchResultByDescription);
  }, 500);
};

onMounted(async () => {
  const fetchPosts = async () => {
    loading.value = true;

    try {
      const response = await axios.get("http://localhost:4000/api/images/community", { headers: { "Content-Type": "application/json" } });

      if (response.status === 200) {
        const result = await response;
        allPosts.value = result.data.reverse();
      }
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  await fetchPosts();
});
</script>

<template>
  <GallerySearchField @input="handleSearchChange" v-model="searchText" label="Поиск публикации"
                      placeholder="Поиск по тегам, автору, названию" />

  <div class="mt-10">
    <div v-if="loading" class="flex items-center justify-center">
      <Loader />
    </div>

    <template v-else>
      <template v-if="searchText && searchedResults.length === 0">
        <h2 class="mb-3 text-xl font-medium text-[#666e75]">
          Поиск не дал результатов
        </h2>
      </template>

      <template v-else-if="allPosts.length === 0">
        <h2 class="mb-3 text-xl font-medium text-[#666e75]">
          Постов пока что нету
        </h2>
      </template>

      <template v-else>
        <GalleryGrid :posts="searchText ? searchedResults: allPosts" />
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>