<script setup lang="ts">
type ProfileProps = {
  username: string;
  userInfo: {
    posts: number;
    followers: number;
    following: number;
  };
};

const props = defineProps<ProfileProps>();
</script>

<template>
  <div class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ props.username }}</ATypographyTitle>
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5"
        >{{ props.userInfo.posts }} posts</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.followers }} followers</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ props.userInfo.following }} following</ATypographyTitle
      >
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;
}

.bottom-content h5 {
  margin: 0;
  padding: 0;
  margin-right: 30px;
}
</style>
