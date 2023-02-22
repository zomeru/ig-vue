<script lang="ts" setup>
import { ref } from "vue";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/stores/users";
import { storeToRefs } from "pinia";
import type { Post } from "./ImageGallery.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const visible = ref<boolean>(false);
const caption = ref("");
const file = ref<File | null>(null);
const errorMessage = ref("");
const loading = ref(false);

const showModal = () => {
  visible.value = true;
};

const props = defineProps<{
  addNewPost: (post: Post) => void;
}>();

const handleOk = async () => {
  try {
    if (file.value && user.value) {
      loading.value = true;

      const timestamp = new Date().getTime();

      const { data, error } = await supabase.storage
        .from("images")
        .upload(`public/ig-vue-${timestamp}`, file.value);

      if (error) {
        errorMessage.value = "Unable to upload image. Please try again.";
        return;
      }

      if (data) {
        const { data: post } = await supabase
          .from("posts")
          .insert({
            caption: caption.value,
            img_url: data.path,
            user_id: user.value.id,
          })
          .select()
          .single();

        props.addNewPost({
          id: post.id,
          caption: post.caption,
          img_url: post.img_url,
          user_id: post.user_id,
        });

        caption.value = "";
        file.value = null;
        errorMessage.value = "";
        visible.value = false;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleUploadChange = (e: Event) => {
  const currentFile = (e.target as HTMLInputElement).files?.[0];

  if (currentFile) {
    file.value = currentFile;
  }
};
</script>

<template>
  <div>
    <AButton @click="showModal">Upload photo</AButton>
    <AModal v-model:visible="visible" title="Upload photo" @ok="handleOk">
      <div v-if="!loading">
        <input
          type="file"
          accept=".jpeg,.png,.jpg"
          @change="handleUploadChange"
        />
        <AInput
          :maxLength="50"
          v-model="caption"
          placeholder="Caption..."
        />
        <ATypography v-if="errorMessage" type="danger">{{
          errorMessage
        }}</ATypography>
      </div>
      <div v-else class="spinner">
        <ASpin />
      </div>
    </AModal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
