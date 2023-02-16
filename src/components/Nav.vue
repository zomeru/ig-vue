<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Container from "./Container.vue";

const search = ref("");

const onSearch = (value: string) => {
  console.log(value);
};
</script>

<template>
  <ALayoutHeader>
    <Container>
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
        <div class="left-content">
          <AButton type="primary">Sign up</AButton>
          <AButton type="primary">Log in</AButton>
        </div>
      </div>
    </Container>
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

.left-content button {
  margin-left: 15px;
}
</style>
