
<script>
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import GlidePost from "./GlidePost.svelte";

  export let pages;
  export let loading;
  export let loadMoreGlides;

  let lastItemRef;

  function loadNewGlides() {
    if ((lastItemRef.getBoundingClientRect().top <= window.innerHeight) && !loading) {
      loadMoreGlides();
    }
  }

</script>

<svelte:window on:scroll={loadNewGlides} />

{#each Object.keys(pages) as page }
  {#each pages[page].glides as glide (glide.id) }
      <GlidePost {glide}/>
  {/each}
{/each}

{#if loading}
  <CenteredDataLoader />
{:else if pages[1].glides.length === 0}
  <div class="flex-it">
    <div class="bg-yellow-500 mt-6 p-2 rounded-lg mx-4">
      No glides. Create a new glide!
    </div>
  </div>
{/if}

<div bind:this={lastItemRef}></div>
<div class="h-96"></div>
