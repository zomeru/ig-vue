<script setup lang="ts">
import type { Post } from "./ImageGallery.vue";

type PostProps = {
  post: Post;
};

const props = defineProps<PostProps>();
const { VITE_SUPABASE_IMAGE_URL } = import.meta.env;
</script>

<template>
  <ACard hoverable style="width: 240px" class="card">
    <template #cover>
      <img
        :alt="props.post.caption"
        :src="`${VITE_SUPABASE_IMAGE_URL}/${props.post.img_url}`"
      />
    </template>
    <ACardMeta :title="props.post.user_id">
      <template #description>{{ props.post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>
.card {
  margin-bottom: 15px;
}
</style>
