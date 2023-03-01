
<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let snackbars = writable(["Message 1", "Message 2", "Message 3"]);

  let isXl = writable(false);
  let isLg = writable(false);
  
  let innerWidth;

  $: {
    $isXl = innerWidth > 1280;
    $isLg = innerWidth > 1024;
  }

  setContext(key, {
    isXl,
    isLg,
    snackbars
  });

</script>

<svelte:window 
  bind:innerWidth
/>
<slot />
