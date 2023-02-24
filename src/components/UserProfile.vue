<script setup lang="ts">
import AppContainer from "./AppContainer.vue";
import ImageGallery, { type Post } from "./ImageGallery.vue";
import UserBar from "./UserBar.vue";

import { useRoute } from "vue-router";
import { ref, onMounted, watch, reactive } from "vue";
import { supabase } from "@/utils/supabase";
import { useUserStore, type User } from "@/stores/users";
import { storeToRefs } from "pinia";

const route = useRoute();
const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);

console.log("username profile", route.params.username);

const posts = ref<Post[]>([]);
const isFollowing = ref(false);
const user = ref<User | null>(null);
const loading = ref(false);
const userInfo = reactive({
  posts: 0,
  followers: 0,
  following: 0,
});

const addNewPost = (post: Post) => {
  posts.value.unshift(post);
};

const updateIsFollowing = (follow: boolean) => {
  isFollowing.value = follow;
};

const fetchData = async () => {
  loading.value = true;

  try {
    const { data: userData } = await supabase
      .from("users")
      .select()
      .eq("username", route.params.username)
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

      await fetchIsFollowing();
      await fetchUserInfo();
      await fetchUserInfo();
    }
  } catch (error) {
    console.log("error getting data", error);
  } finally {
    loading.value = false;
  }
};

const fetchUserInfo = async () => {
  try {
    const { count: followersCount } = await supabase
      .from("followers_following")
      .select("*", { count: "exact" })
      .eq("following_id", user.value?.id);

    const { count: followingCount } = await supabase
      .from("followers_following")
      .select("*", { count: "exact" })
      .eq("follower_id", user.value?.id);

    const { count: postsCount } = await supabase
      .from("posts")
      .select("*", { count: "exact" })
      .eq("user_id", user.value?.id);

    console.log({
      followersCount,
      followingCount,
      postsCount,
    });

    userInfo.followers = followersCount || 0;
    userInfo.following = followingCount || 0;
    userInfo.posts = postsCount || 0;
  } catch (error) {
    console.log("error getting user info", error);
  }
};

const fetchIsFollowing = async () => {
  if (!loggedInUser.value || !user.value) return;

  if (loggedInUser.value.id === user.value.id) return;

  try {
    const { data: isFollowingData } = await supabase
      .from("followers_following")
      .select()
      .eq("follower_id", loggedInUser.value.id)
      .eq("following_id", user.value.id)
      .single();

    if (isFollowingData) isFollowing.value = true;
  } catch (error) {
    console.log("error getting isFollowing", error);
  }
};

watch(loggedInUser, fetchIsFollowing);

onMounted(() => {
  fetchData();
});

// watch(route, fetchData);
</script>

<template>
  <AppContainer>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="route.params.username.toString()"
        :user="user"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"
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
