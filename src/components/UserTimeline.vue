<script setup lang="ts">
import AppContainer from "./AppContainer.vue";
import PostCard from "./PostCard.vue";

const data = [
  {
    id: 1,
    username: "user1",
    image: "https://picsum.photos/201",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    username: "user2",
    image: "https://picsum.photos/202",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    username: "user3",
    image: "https://picsum.photos/203",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
</script>

<template>
  <AppContainer>
    <div class="timeline-container">
      <PostCard v-for="post in data" :key="post.id" :post="post" />
    </div>
  </AppContainer>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
</style>
