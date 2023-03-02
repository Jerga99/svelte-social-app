import { fetchGlides } from "@api/glides";
import { onMount } from "svelte";
import { writable } from "svelte/store"

export function createGlideStore() {
  const glides = writable([]);

  onMount(fetchGlides);

  function addGlide(glide) {
    glides.update(list => [glide, ...list]);
  }

  return {
    glides: { subscribe: glides.subscribe },
    addGlide,
  }
}
