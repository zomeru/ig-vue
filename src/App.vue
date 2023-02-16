<script setup lang="ts">
import { RouterView } from "vue-router";

import { Nav } from "@/components";
</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped></style>
