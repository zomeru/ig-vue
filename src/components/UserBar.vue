<script setup lang="ts">
import { UploadPhotoModal } from ".";
import { useUserStore, type User } from "@/stores/users";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import type { Post } from "./ImageGallery.vue";

const route = useRoute();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

type ProfileProps = {
  user: User | null;
  userInfo: {
    posts: number;
    followers: number;
    following: number;
  };
  addNewPost: (post: Post) => void;
};

const props = defineProps<ProfileProps>();

const addNewPost = (post: Post) => {
  props.addNewPost(post);
};
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <ATypographyTitle :level="2">{{
        props.user?.username
      }}</ATypographyTitle>
      <UploadPhotoModal
        v-if="user && route.params.username === user.username"
        :addNewPost="addNewPost"
      />
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5"
        >{{ props.userInfo.posts }} posts</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.followers }} followers</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.following }} following</ATypographyTitle
      >
    </div>
  </div>
  <div class="userbar-container" v-else>
    <div class="top-content">
      <ATypographyTitle :level="2">User not found</ATypographyTitle>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;
}

.bottom-content h5 {
  margin: 0;
  padding: 0;
  margin-right: 30px;
}

.top-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
