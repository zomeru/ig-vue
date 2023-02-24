<script setup lang="ts">
import { UploadPhotoModal } from ".";
import { useUserStore, type User } from "@/stores/users";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import type { Post } from "./ImageGallery.vue";
import { supabase } from "@/utils/supabase";

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
  isFollowing: boolean;
  addNewPost: (post: Post) => void;
  updateIsFollowing: (follow: boolean) => void;
};

const props = defineProps<ProfileProps>();

const addNewPost = (post: Post) => {
  props.addNewPost(post);
};

const followUnfollowUser = async () => {
  if (!user.value || !props.user) return;

  try {
    if (props.isFollowing) {
      await supabase
        .from("followers_following")
        .delete()
        .eq("follower_id", user.value.id)
        .eq("following_id", props.user.id);

      props.updateIsFollowing(false);
    } else {
      await supabase.from("followers_following").insert([
        {
          follower_id: user.value.id,
          following_id: props.user.id,
        },
      ]);
      props.updateIsFollowing(true);
    }
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <ATypographyTitle :level="2">{{
        props.user?.username
      }}</ATypographyTitle>
      <div v-if="user">
        <UploadPhotoModal
          v-if="route.params.username === user.username"
          :addNewPost="addNewPost"
        />
        <AButton v-else @click="followUnfollowUser">{{
          props.isFollowing ? "Following" : "Follow"
        }}</AButton>
      </div>
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5"
        >{{ props.userInfo.posts || 0 }} posts</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.followers || 0 }} followers</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.following || 0 }} following</ATypographyTitle
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
