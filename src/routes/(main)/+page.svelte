<script>
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  
  const { pages, loading, addGlide, loadGlides } = createGlideStore();
</script>

<Messenger 
  onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />

<PaginatedGlides 
  pages={$pages} 
  loading={$loading}
  loadMoreGlides={loadGlides}
/>


