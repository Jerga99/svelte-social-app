
<script>
  import { page } from "$app/stores";
  import GlidePost from "@components/glides/GlidePost.svelte";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  import { pageStore } from "@stores/pageStore";
  import BackButton from "@components/utils/BackButton.svelte";
  import { createSubglideStore } from "@stores/createSubglideStore";
  import { onDestroy, onMount } from "svelte";
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import { fetchGlide } from "@api/glides";
  
  const { 
    glide, loading, 
    getGlide, incrementSubglidesCount 
  } = createGlideIdStore(async () => {
    const _glide = await fetchGlide($page.params.uid, $page.params.id);
    onGlideLoaded(_glide);
    return _glide;
  });

  const { 
    pages, loading: loadingSubglides, 
    loadGlides, addGlide, resetPagination
  } = createSubglideStore();

  pageStore.title.set(BackButton);
  pageStore.onGlidePosted.set(addGlide);

  $: {
    if ($glide && !$loading && $page.params.id !== $glide.id) {
      getGlide();
    }
  }

  onMount(getGlide);
  onDestroy(() => pageStore.activeGlide.set(null));

  function onGlideLoaded(glide) {
    resetPagination();
    loadGlides(glide.lookup);
    pageStore.activeGlide.set({...glide});
  }

</script>

{#if $loading}
  <CenteredDataLoader />
{:else if $glide}
  <GlidePost glide={$glide} />
  <div class="p-4 border-b-1 border-solid border-gray-700">
    <div class="text-sm italic text-gray-300 underline mb-2">
      Answering to: {$glide.user.nickName}
    </div>
    <Messenger 
      glideLookup={$glide.lookup}
      showAvatar={false} 
      onGlidePosted={(glide) => {
        addGlide(glide);
        incrementSubglidesCount();
      }} 
    />
  </div>
  <PaginatedGlides
    pages={$pages}
    loading={$loadingSubglides}
    loadMoreGlides={() => {
      loadGlides($glide.lookup);
    }}
  />
{/if}
