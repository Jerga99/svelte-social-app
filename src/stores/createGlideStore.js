import { fetchGlides, onGlidesSnapshot } from "@api/glides";
import { onMount } from "svelte";
import { get, writable } from "svelte/store"

const FIRST_PAGE = 1;

export function createGlideStore(loggedInUser) {
  const pages = writable({[FIRST_PAGE]: {glides: []}});
  const page = writable(FIRST_PAGE);
  const freshGlides = writable([]);
  const loading = writable(false);

  let lastGlideDoc;

  onMount(loadGlides);

  async function loadGlides() {
    const _page = get(page);

    if (_page > 1 && !lastGlideDoc) {
      return;
    }

    loading.set(true);
    try {
      const { glides, lastGlideDoc: _lastGlideDoc } = await fetchGlides(lastGlideDoc, loggedInUser);

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

  function subscribeToNewGlides() {
    if (loggedInUser.following.length === 0) {
      return;
    }

    onGlidesSnapshot(loggedInUser, (newGlides) => {
      freshGlides.set(newGlides);
    });
  }

  return {
    pages: { subscribe: pages.subscribe },
    loading: { subscribe: loading.subscribe },
    freshGlides: { subscribe: freshGlides.subscribe },
    addGlide,
    loadGlides,
    subscribeToNewGlides
  }
}
