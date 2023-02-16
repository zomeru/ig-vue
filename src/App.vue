<script setup lang="ts">
import { RouterView } from "vue-router";

import { NavBar } from "@/components";
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped></style>
