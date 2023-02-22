import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";

export interface User {
  id: number;
  username: string;
  email: string;
  date: string;
}

export interface Credentials {
  email: string;
  password: string;
  username: string;
}

type LoginCredentials = Pick<Credentials, "email" | "password">;

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
  const loadingUser = ref(false);
  const errorMessage = ref("");

  const isDev = process.env.NODE_ENV !== "development";

  const handleLogin = async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      errorMessage.value = "Email is invalid";
      return;
    }

    if (!password.length) {
      errorMessage.value = "Password is required";
      return;
    }

    errorMessage.value = "";
    loading.value = true;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        errorMessage.value = error.message;
        return;
      }

      const { data: newUser } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();

      user.value = newUser;
    } catch (err) {
      if (isDev) console.log("err", err);
      errorMessage.value = "Something went wrong! Please try again.";
    } finally {
      loading.value = false;
    }
  };

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

      const { data: newUser } = await supabase
        .from("users")
        .insert({
          username,
          email,
        })
        .select()
        .single();

      user.value = newUser;
    } catch (err) {
      if (isDev) console.log("err", err);
      errorMessage.value = "Something went wrong! Please try again.";
    } finally {
      loading.value = false;
    }
  };
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      user.value = null;

      const userLocalStorage = localStorage.getItem(
        "sb-cybjwcylxbclrswgmcia-auth-token"
      );

      if (userLocalStorage) {
        localStorage.removeItem("sb-cybjwcylxbclrswgmcia-auth-token");
      }
    } catch (err) {
      if (isDev) console.log("err", err);
    }
  };

  const getUser = async () => {
    loadingUser.value = true;
    try {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        const { data: newUser } = await supabase
          .from("users")
          .select()
          .eq("email", data.user.email)
          .single();

        if (user) {
          user.value = newUser;
        }
      }
    } catch (err) {
      if (isDev) console.log("err", err);
    } finally {
      loadingUser.value = false;
    }
  };

  const clearErrorMessage = () => {
    errorMessage.value = "";
  };

  return {
    user,
    loading,
    loadingUser,
    errorMessage,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
