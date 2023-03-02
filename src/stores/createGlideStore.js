import { writable } from "svelte/store"

export function createGlideStore() {
  const glides = writable([]);

  function addGlide(glide) {
    glides.update(list => [glide, ...list]);
  }

  return {
    glides: { subscribe: glides.subscribe },
    addGlide,
  }
}
