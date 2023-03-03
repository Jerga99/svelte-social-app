<script>
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import { pageStore } from "@stores/pageStore";
  
  const { pages, loading, addGlide, loadGlides } = createGlideStore();
  pageStore.title.set("Home");
  
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


