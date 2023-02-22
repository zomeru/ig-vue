<script setup lang="ts">
import AppContainer from "./AppContainer.vue";
import ImageGallery, { type Post } from "./ImageGallery.vue";
import UserBar from "./UserBar.vue";

import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { supabase } from "@/utils/supabase";
import type { User } from "@/stores/users";

const route = useRoute();
const { username } = route.params;

console.log("username", route.params.username);

const posts = ref<Post[]>([]);
const user = ref<User | null>(null);
const loading = ref(false);

const addNewPost = (post: Post) => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;

  try {
    const { data: userData } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (!userData) {
      user.value = null;
      posts.value = [];
      return;
    }

    user.value = userData;

    const { data: postsData } = await supabase
      .from("posts")
      .select()
      .eq("user_id", userData.id)
      .order("created_at", { ascending: false });

    if (postsData) {
      posts.value = postsData;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(
  () => username,
  () => {
    fetchData();
  }
);
</script>

<template>
  <AppContainer>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="username ? username as string : ''"
        :user="user"
        :userInfo="{
          posts: 10,
          followers: 100,
          following: 100,
        }"
        :addNewPost="addNewPost"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div class="spinner" v-else>
      <ASpin />
    </div>
  </AppContainer>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>
