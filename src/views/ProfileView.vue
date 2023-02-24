<script setup lang="ts">
import { UserProfile } from "@/components";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <main>
    <UserProfile :key="route.params.username.toString()" />
  </main>
</template>
