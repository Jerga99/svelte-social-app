import { fetchGlide } from "@api/glides";
import { onMount } from "svelte";
import { writable } from "svelte/store"


export function createGlideIdStore(uid, id) {
  const glide = writable(null);

  onMount(async () => {
    const _glide = await fetchGlide(uid, id);
    glide.set(_glide);
  })

  return {
    glide: {
      subscribe: glide.subscribe
    }
  }
}
