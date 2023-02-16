<script setup lang="ts">
type ImageGalleryProps = {
  posts: {
    id: number;
    image: string;
  }[];
};

const props = defineProps<ImageGalleryProps>();
</script>

<template>
  <div class="image-gallery-container">
    <img v-for="post in props.posts" :key="post.id" :src="post.image" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

image {
  margin: 5px;
  width: 200px;
}
</style>
