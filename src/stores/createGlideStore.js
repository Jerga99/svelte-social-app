import { fetchGlides } from "@api/glides";
import { onMount } from "svelte";
import { get, writable } from "svelte/store"

const FIRST_PAGE = 1;

export function createGlideStore() {
  const pages = writable({[FIRST_PAGE]: {glides: []}});
  const page = writable(FIRST_PAGE);
  const loading = writable(false);

  onMount(loadGlides);

  async function loadGlides() {
    const _page = get(page);
    console.log("Loading page: " + _page);

    loading.set(true);
    try {
      const { glides } = await fetchGlides();

      if (glides.length > 0) {
        pages.update(_pages => ({..._pages, [_page]: {glides}}));

        console.log(get(pages));
      }

    } catch(e) {
      console.log(e.message);
    } finally {
      loading.set(false);
    }
  }

  function addGlide(glide) {
    console.log(glide);
    // glides.update(list => [glide, ...list]);
  }

  return {
    pages: { subscribe: pages.subscribe },
    loading: { subscribe: loading.subscribe },
    addGlide,
  }
}
