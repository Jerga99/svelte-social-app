
<script>
  import GlidePost from "./GlidePost.svelte";

  export let pages;

  let lastItemRef;

  function loadNewGlides() {
    if (lastItemRef.getBoundingClientRect().top <= window.innerHeight) {
      console.log("Load more glides!");
    }
  }

</script>

<svelte:window on:scroll={loadNewGlides} />

{#each Object.keys(pages) as page }
  {#each pages[page].glides as glide (glide.id) }
      <GlidePost {glide}/>
  {/each}
{/each}

<div bind:this={lastItemRef}></div>
<div class="h-96"></div>
