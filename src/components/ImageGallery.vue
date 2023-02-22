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
</script>

<template>
  <div class="image-gallery-container">
    <img
      v-for="post in props.posts"
      :key="post.id"
      :src="`https://cybjwcylxbclrswgmcia.supabase.co/storage/v1/object/public/images/${post.img_url}`"
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
