import { fetchSubglides } from "@api/glides";
import { get, writable } from "svelte/store"

const FIRST_PAGE = 1;

export function createSubglideStore() {
  const pages = writable({[FIRST_PAGE]: {glides: []}});
  const page = writable(FIRST_PAGE);
  const loading = writable(false);

  let lastGlideDoc;
  
  async function loadGlides(glideLookup) {
    const _page = get(page);

    if (_page > 1 && !lastGlideDoc) {
      return;
    }

    loading.set(true);
    try {
      const { glides, lastGlideDoc: _lastGlideDoc } = await fetchSubglides(lastGlideDoc, glideLookup);

      if (glides.length > 0) {
        pages.update(_pages => ({..._pages, [_page]: {glides}}));
        page.update(_page => _page + 1);
      }

      lastGlideDoc = _lastGlideDoc;
    } catch(e) {
      console.log(e.message);
    } finally {
      loading.set(false);
    }
  }

  function addGlide(glide) {
    pages.update(_pages => {
      _pages[FIRST_PAGE].glides.unshift(glide);
      return _pages;
    })
  }

  return {
    pages: { subscribe: pages.subscribe },
    loading: { subscribe: loading.subscribe },
    loadGlides, addGlide
  }
}
