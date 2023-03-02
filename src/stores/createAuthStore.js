import { authenticate } from "@api/auth";
import { getUIContext } from "@components/context/UI";
import { writable } from "svelte/store";


export function createAuthStore(authType) {
  const { addSnackbar } = getUIContext();
  const loading = writable(false);

  async function authUser(form) {
    loading.set(true);

    try {
      await authenticate(form, authType);
      addSnackbar("Welcome Back!", "success");
    } catch(e) {
      addSnackbar(e.message, "error");
      loading.set(false);
    }
  }

  return {
    authUser,
    loading: { subscribe: loading.subscribe }
  }
}
