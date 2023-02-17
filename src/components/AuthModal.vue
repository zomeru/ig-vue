<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore, type Credentials } from "@/stores/users";
import { storeToRefs } from "pinia";

type AuthModalProps = {
  isLogin: boolean;
};

const userStore = useUserStore();
const { errorMessage, user, loading } = storeToRefs(userStore);

const visible = ref<boolean>(false);

const userCredentials = reactive<Credentials>({
  username: "",
  email: "",
  password: "",
});

const props = defineProps<AuthModalProps>();

const showModal = () => {
  visible.value = true;
};

const clearUserCredentialsInput = () => {
  userCredentials.email = "";
  userCredentials.password = "";
  userCredentials.username = "";
};

const handleOk = async (e: MouseEvent) => {
  await userStore.handleSignup(userCredentials);

  if (user.value) {
    console.log("user", user.value);
    visible.value = false;
    clearUserCredentialsInput();
  }
};

const title = props.isLogin ? "Log in" : "Sign up";

const handleCancel = (e: MouseEvent) => {
  visible.value = false;
  userStore.clearErrorMessage();
  clearUserCredentialsInput();
};
</script>

<template>
  <div>
    <AButton type="primary" @click="showModal" class="btn">{{
      title
    }}</AButton>
    <AModal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <AButton key="back" :disabled="loading" @click="handleCancel"
          >Cancel</AButton
        >
        <AButton
          :disabled="loading"
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          >Submit</AButton
        >
      </template>
      <div v-if="!loading" class="input-container">
        <AInput
          class="input"
          v-if="!isLogin"
          v-model:value="userCredentials.username"
          placeholder="Username"
        />
        <AInput
          class="input"
          v-model:value="userCredentials.email"
          placeholder="Email"
        />
        <AInput
          class="input"
          v-model:value="userCredentials.password"
          placeholder="Password"
          type="password"
        />
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>
      <ATypographyText v-if="errorMessage" type="danger">{{
        errorMessage
      }}</ATypographyText>
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

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}
</style>
