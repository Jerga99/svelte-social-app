import { fetchGlides } from "@api/glides";
import { onMount } from "svelte";
import { writable } from "svelte/store"

export function createGlideStore() {
  const glides = writable([]);
  const loading = writable(false);

  onMount(loadGlides);

  async function loadGlides() {
    loading.set(true);
    try {
      const { glides: _glides } = await fetchGlides();
      glides.set(_glides);
    } catch(e) {
      console.log(e.message);
    } finally {
      loading.set(false);
    }
  }

  function addGlide(glide) {
    glides.update(list => [glide, ...list]);
  }

  return {
    glides: { subscribe: glides.subscribe },
    loading: { subscribe: loading.subscribe },
    addGlide,
  }
}
