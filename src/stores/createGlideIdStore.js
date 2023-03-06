import { fetchGlide } from "@api/glides";
import { writable } from "svelte/store"

export function createGlideIdStore(uid, id) {
  const glide = writable(null);
  const loading = writable(true);

  async function getGlide() {
    // const loading = writable(true);
    const _glide = await fetchGlide(uid, id);
    loading.set(false);
    glide.set(_glide);
    return _glide;
  }

  return {
    glide: {
      subscribe: glide.subscribe
    },
    loading: {
      subscribe: loading.subscribe
    },
    getGlide
  }
}
