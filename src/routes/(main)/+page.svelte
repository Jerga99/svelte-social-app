<script>
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import GlidePost from "../../components/glides/GlidePost.svelte";

  const { pages, loading, addGlide } = createGlideStore();

</script>

<Messenger 
  onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />

{#each Object.keys($pages) as page }
  {#each $pages[page].glides as glide (glide.id) }
      <GlidePost {glide}/>
  {/each}
{/each}

{#if $loading}
  <CenteredDataLoader />
{/if}

