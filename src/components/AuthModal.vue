<script setup lang="ts">
import { ref } from "vue";

type AuthModalProps = {
  isLogin: boolean;
};

const visible = ref<boolean>(false);

const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const props = defineProps<AuthModalProps>();

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  visible.value = false;
};

const title = props.isLogin ? "Log in" : "Sign up";
</script>

<template>
  <div>
    <AButton type="primary" @click="showModal" class="btn">{{
      title
    }}</AButton>
    <AModal v-model:visible="visible" :title="title" @ok="handleOk">
      <AInput
        class="input"
        v-if="isLogin"
        v-model:value="username"
        placeholder="Username"
      />
      <AInput class="input" v-model:value="email" placeholder="Email" />
      <AInput
        class="input"
        v-model:value="password"
        placeholder="Password"
      />
    </AModal>
  </div>
</template>

<style scoped>
.btn {
  margin-left: 15px;
}
.input {
  margin-bottom: 10px;
}
</style>
