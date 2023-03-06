<script>
  import { getAuthContext } from "@components/context/auth";
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import Portal from "@components/utils/Portal.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import { pageStore } from "@stores/pageStore";
  
  const { auth } = getAuthContext();
  const { 
    pages, freshGlides, 
    loading, 
    addGlide, loadGlides,
    displayFreshGlides
  } = createGlideStore($auth.user);

  pageStore.title.set("Home");
  pageStore.onGlidePosted.set(addGlide);

</script>

<Messenger 
  onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />

{#if $freshGlides.length >= 3}
  <Portal>
    <div class="fixed top-2 z-100 left-2/4 -translate-x-1/2">
      <button
        on:click={displayFreshGlides}
        type="button"
        class="
				disabled:cursor-not-allowed disabled:bg-gray-400
				bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
      >
        <div class="flex-it flex-row text-sm font-bold text-white items-start justify-center">
          <span>Read New Glides</span>
        </div>
      </button>
    </div>
  </Portal>
{/if}

<PaginatedGlides 
  pages={$pages} 
  loading={$loading}
  loadMoreGlides={loadGlides}
/>


