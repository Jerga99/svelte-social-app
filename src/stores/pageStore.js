import { writable } from "svelte/store";


function createPageStore() {
  const title = writable("");

  return {
    title,
  }
}

export const pageStore = createPageStore();
