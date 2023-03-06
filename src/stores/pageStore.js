import { writable } from "svelte/store";


function createPageStore() {
  const title = writable("");
  const activeGlide = writable(null);

  return {
    title,
    activeGlide
  }
}

export const pageStore = createPageStore();
