<script setup lang="ts">
type PostProps = {
  post: {
    id: number;
    username: string;
    image: string;
    caption: string;
  };
};

const props = defineProps<PostProps>();
</script>

<template>
  <ACard hoverable style="width: 240px" class="card">
    <template #cover>
      <img alt="example" :src="props.post.image" />
    </template>
    <ACardMeta :title="props.post.username">
      <template #description>{{ props.post.caption }}</template>
    </ACardMeta>
  </ACard>
</template>

<style scoped>
.card {
  margin-bottom: 15px;
}
</style>
