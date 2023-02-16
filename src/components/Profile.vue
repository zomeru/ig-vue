<script setup lang="ts">
import Container from "./Container.vue";
import ImageGallery from "./ImageGallery.vue";
import UserBar from "./UserBar.vue";
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        username="zomeru"
        :userInfo="{
          posts: 10,
          followers: 100,
          following: 100,
        }"
      />
      <ImageGallery
        :posts="[
          {
            id: 1,
            image: 'https://picsum.photos/201',
          },
        ]"
      />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  padding: 20px 0;
}
</style>
