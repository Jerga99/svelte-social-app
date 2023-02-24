
<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let isXl = writable(false);
  let isLg = writable(false);
  let loading = writable(true);

  let innerWidth;

  onMount(() => {
    $loading = false;
  })

  $: {
    $isXl = innerWidth > 1280;
    $isLg = innerWidth > 1024;
  }

  setContext(key, {
    isXl,
    isLg,
    loading
  });

</script>

<svelte:window 
  bind:innerWidth
/>
<slot />
