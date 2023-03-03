
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
{/if}

<div bind:this={lastItemRef}></div>
<div class="h-96"></div>
