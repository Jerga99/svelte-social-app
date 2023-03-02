import { writable } from "svelte/store"

export function createGlideStore() {
  const glides = writable([]);

  function addGlide() {
    console.log("Adding glide!");
  }

  return {
    glides: { subscribe: glides.subscribe },
    addGlide,
  }
}
