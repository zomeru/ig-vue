<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import AppContainer from "./AppContainer.vue";
import AuthModal from "./AuthModal.vue";

const router = useRouter();

const search = ref("");
const isAuthenticated = ref(false);

const onSearch = () => {
  if (search.value) {
    router.push(`/profile/${search.value}`);
    search.value = "";
  }
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
          />
        </div>
        <div class="left-content" v-if="isAuthenticated">
          <AuthModal :isLogin="true" />
          <AuthModal :isLogin="false" />
        </div>
        <div class="left-content" v-else>
          <AButton type="primary">Profile</AButton>
          <AButton type="primary">Log out</AButton>
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
