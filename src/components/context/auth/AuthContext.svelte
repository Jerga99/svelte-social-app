
<script>
  import Loader from "@components/utils/Loader.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let isLoading = writable(true);
  let isAuthenticated = writable(false, (set) => {
    setTimeout(() => {
      set(false); // isAuthenticated setter
      isLoading.set(false);
    }, 1000);
  });

  setContext(key, {
    isAuthenticated, isLoading
  })

</script>

<!-- Just to subscribe so start function can be called -->
<div style="display:none;">
  {$isAuthenticated}
</div>

{#if $isLoading}
  <Loader size={150} />
{:else}
  <slot />
{/if}

