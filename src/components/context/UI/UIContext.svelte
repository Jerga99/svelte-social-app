
<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let snackbars = writable([]);

  let isXl = writable(false);
  let isLg = writable(false);
  
  let innerWidth;

  $: {
    $isXl = innerWidth > 1280;
    $isLg = innerWidth > 1024;
  }

  function addSnackbar(message, type) {
    snackbars.update(list => [{message, type}, ...list])
  }

  setContext(key, {
    isXl,
    isLg,
    snackbars,
    addSnackbar
  });

</script>

<svelte:window 
  bind:innerWidth
/>
<slot />
