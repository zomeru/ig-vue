<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import AppContainer from "./AppContainer.vue";
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { loadingUser, user } = storeToRefs(userStore);
const router = useRouter();

const search = ref("");

const onSearch = () => {
  if (search.value) {
    router.push(`/profile/${search.value}`);
    search.value = "";
  }
};

const handleLogout = async () => {
  await userStore.handleLogout();
  router.push("/");
};
</script>

<template>
  <ALayoutHeader>
    <AppContainer>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Instagram</RouterLink>
          <AInputSearch
            v-model:value="search"
            placeholder="Search..."
            style="width: 200px"
            @search="onSearch"
            aria-autocomplete="none"
          />
        </div>
        <div v-if="!loadingUser" class="content">
          <div class="left-content" v-if="!user">
            <AuthModal :isLogin="true" />
            <AuthModal :isLogin="false" />
          </div>
          <div class="left-content" v-else>
            <AButton type="primary">Profile</AButton>
            <AButton type="primary" @click="handleLogout">Log out</AButton>
          </div>
        </div>
        <div v-else>
          <ASpin />
        </div>
      </div>
    </AppContainer>
  </ALayoutHeader>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  align-items: center;
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 15px;
}

.left-content {
  display: flex;
  align-items: center;
}

.left-content button {
  margin-left: 15px;
}
</style>
