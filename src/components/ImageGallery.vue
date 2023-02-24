<script setup lang="ts">
export interface Post {
  id: number;
  img_url: string;
  caption?: string;
  user_id: number;
}

export type ImageGalleryProps = {
  posts: Post[];
};

const props = defineProps<ImageGalleryProps>();
const { VITE_SUPABASE_IMAGE_URL } = import.meta.env;
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in props.posts"
      :key="post.id"
      :src="`${VITE_SUPABASE_IMAGE_URL}/${post.img_url}`"
      :alt="post.caption"
    />
  </div>
</template>

<style scoped>
.image-gallery-container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

img {
  margin: 5px;
  width: 200px;
  height: 200px;
}
</style>
