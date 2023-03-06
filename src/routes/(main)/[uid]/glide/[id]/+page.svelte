
<script>
  import { page } from "$app/stores";
  import GlidePost from "@components/glides/GlidePost.svelte";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  import { pageStore } from "@stores/pageStore";
  import BackButton from "@components/utils/BackButton.svelte";
  import { createSubglideStore } from "@stores/createSubglideStore";
  import { onMount } from "svelte";
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  
  const { 
    glide, loading, 
    getGlide, incrementSubglidesCount 
  } = createGlideIdStore($page.params.uid, $page.params.id);

  const { 
    pages, loading: loadingSubglides, 
    loadGlides, addGlide 
  } = createSubglideStore();

  pageStore.title.set(BackButton);

  $: {
    if ($glide && !$loading && $page.params.id !== $glide.id) {
      console.log("Should reload the page!!!!!!!!");
    }
  }

  onMount(async () => {
    const _glide = await getGlide();
    loadGlides(_glide.lookup);
  });

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
    loadMoreGlides={() => {}}
  />
{/if}
