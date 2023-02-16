<script setup lang="ts">
type PostProps = {
  post: {
    id: number;
    username: string;
    image: string;
    caption: string;
  };
};

const { post } = defineProps<PostProps>();
</script>

<template>
  <ACard hoverable style="width: 240px" class="card">
    <template #cover>
      <img alt="example" :src="post.image" />
    </template>
    <ACardMeta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>
.card {
  margin-bottom: 15px;
}
</style>
