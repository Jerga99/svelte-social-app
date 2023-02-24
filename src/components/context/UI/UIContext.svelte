
<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let isXl = writable(false);
  let isLg = writable(false);

  let innerWidth;

  $: {
    $isXl = innerWidth > 1280;
    $isLg = innerWidth > 1024;
  }

  setContext(key, {
    isXl,
    isLg
  });

</script>

<svelte:window 
  bind:innerWidth
/>
<slot />
