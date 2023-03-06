
import { writable } from "svelte/store"

export function createGlideIdStore(getData) {
  const glide = writable(null);
  const loading = writable(true);

  async function getGlide() {
    loading.set(true);
    const _glide = await getData();
    loading.set(false);
    glide.set(_glide);
    return _glide;
  }

  function incrementSubglidesCount() {
    glide.update(_glide => ({..._glide, subglidesCount: _glide.subglidesCount + 1}))
  }

  return {
    glide: {
      subscribe: glide.subscribe
    },
    loading: {
      subscribe: loading.subscribe
    },
    getGlide, incrementSubglidesCount
  }
}
