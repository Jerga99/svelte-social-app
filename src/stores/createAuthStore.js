import { authenticate } from "@api/auth";
import { writable } from "svelte/store";


export function createAuthStore(authType) {
  const loading = writable(false);

  async function authUser(form) {
    loading.set(true);

    try {
      await authenticate(form, authType);
    } catch(e) {
      console.log(e.message);
      loading.set(false);
    }
  }

  return {
    authUser,
    loading: { subscribe: loading.subscribe }
  }
}
