
<script>
  import { page } from "$app/stores";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  
  const { glide, loading } = createGlideIdStore($page.params.uid, $page.params.id);

</script>

{#if $loading}
  <CenteredDataLoader />
{:else}
  Data Loaded!
{/if}
