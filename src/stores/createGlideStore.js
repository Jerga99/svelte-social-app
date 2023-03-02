import { writable } from "svelte/store"

export function createGlideStore() {
  const glides = writable([]);

  function addGlide(glide) {
    console.log("Adding glide: " + JSON.stringify(glide));
  }

  return {
    glides: { subscribe: glides.subscribe },
    addGlide,
  }
}
