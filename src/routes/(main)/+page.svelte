<script>
  import { getAuthContext } from "@components/context/auth";
  import PaginatedGlides from "@components/glides/PaginatedGlides.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import { pageStore } from "@stores/pageStore";
  import { onMount } from "svelte";
  
  const { auth } = getAuthContext();
  const { pages, loading, addGlide, loadGlides, subscribeToNewGlides } = createGlideStore($auth.user);

  pageStore.title.set("Home");

  onMount(subscribeToNewGlides);
  
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


