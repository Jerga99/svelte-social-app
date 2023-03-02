
<script>
  import GlidePost from "./GlidePost.svelte";

  export let pages;
</script>


{#each Object.keys(pages) as page }
  {#each pages[page].glides as glide (glide.id) }
      <GlidePost {glide}/>
  {/each}
{/each}
