import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";

interface User {
  id: number;
  username: string;
  email: string;
}

export interface Credentials {
  username: string;
  email: string;
  password: string;
}

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const useUserStore = defineStore("users", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const errorMessage = ref("");

  const handleLogin = async (email: string, password: string) => {};

  const handleSignup = async (credentials: Credentials) => {
    const { email, username, password } = credentials;

    if (password.length < 6) {
      errorMessage.value = "Password must be at least 6 characters";
      return;
    }

    if (username.length < 4) {
      errorMessage.value = "Username must be at least 4 characters";
      return;
    }

    if (!validateEmail(email)) {
      errorMessage.value = "Email is invalid";
      return;
    }

    errorMessage.value = "";
    loading.value = true;

    try {
      const { data: userExistsWithUsername } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .single();

      if (userExistsWithUsername) {
        errorMessage.value = "Username already exists";
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        errorMessage.value = error.message;
        return;
      }

      const { data } = await supabase
        .from("users")
        .insert({
          username,
          email,
        })
        .select()
        .single();

      user.value = {
        id: data.id,
        username: data.username,
        email: data.email,
      };
    } catch (err) {
      console.log("err", err);
      errorMessage.value = "Something went wrong! Please try again.";
    } finally {
      loading.value = false;
    }
  };
  const handleLogout = async () => {};

  const getUser = async () => {};

  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  return {
    user,
    loading,
    errorMessage,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
