<script lang="ts" setup>
import { ref, onMounted } from "vue";

const observer = ref<IntersectionObserver | null>(null);
const root = ref<HTMLElement | null>(null);

const emits = defineEmits(["intersect"]);

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        emits("intersect");
      }
    });
  });

  if (observer.value) {
    observer.value.observe(document.querySelector(".observer")!);
  }
});
</script>

<template>
  <div class="observer" ref="root"></div>
</template>

<style scoped>
.observer {
  height: 100px;
  width: 100vw;
  background-color: red;
}
</style>
