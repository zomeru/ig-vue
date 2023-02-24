<script setup lang="ts">
import AppContainer from "./AppContainer.vue";
import PostCard from "./PostCard.vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "@/utils/supabase";
import { onMounted, watch, ref } from "vue";
import type { Post } from "./ImageGallery.vue";
import IntersectionObserver from "./IntersectionObserver.vue";

const userStore = useUserStore();
const { user, loadingUser } = storeToRefs(userStore);

const posts = ref<Post[]>([]);
const lastPostIndex = ref(2);
const followingIds = ref<string[]>([]);
const postsEnd = ref(false);

const fetchData = async () => {
  console.log("user", user.value);
  if (!user.value) return;

  const { data: following } = await supabase
    .from("followers_following")
    .select("following_id")
    .eq("follower_id", user.value.id);

  if (!following) return;

  const _followingIds = following.map((item) => item.following_id);
  followingIds.value = _followingIds;

  const { data: followingPosts } = (await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false })
    .range(0, lastPostIndex.value)
    .in("user_id", _followingIds)) as { data: Post[] };

  if (followingPosts) posts.value = followingPosts;
};

const fetchNextSetOfPosts = async () => {
  if (postsEnd.value) return;

  const { data: followingPosts } = (await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false })
    .range(lastPostIndex.value + 1, lastPostIndex.value + 3)
    .in("user_id", followingIds.value)) as { data: Post[] };

  console.log("followingPosts", followingPosts);

  if (followingPosts) {
    posts.value = [...posts.value, ...followingPosts];
    lastPostIndex.value += 3;
  }

  if (!followingPosts.length) {
    postsEnd.value = true;
  }
};

onMounted(() => {
  fetchData();
});

watch(user, () => {
  fetchData();
});
</script>

<template>
  <AppContainer>
    <div v-if="!loadingUser">
      <div v-if="user" class="timeline-container">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
        <IntersectionObserver
          v-if="posts.length"
          @intersect="fetchNextSetOfPosts"
        />
      </div>
      <div v-else class="timeline-container">
        <h3>Log in to see posts</h3>
      </div>
    </div>
    <div v-else class="spinner">
      <ASpin />
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

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
</style>
