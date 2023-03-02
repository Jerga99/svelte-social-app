<script>
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  
  const { pages, loading, addGlide } = createGlideStore();
</script>

<Messenger 
  onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />

<PaginatedGlides pages={$pages} />

{#if $loading}
  <CenteredDataLoader />
{/if}

