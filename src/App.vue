<script setup lang="ts">
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/users";
import { onMounted } from "vue";

import { NavBar } from "@/components";

onMounted(() => {
  useUserStore().getUser();
});
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped></style>
