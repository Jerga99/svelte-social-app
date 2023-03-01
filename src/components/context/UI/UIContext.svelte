
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
    snackbars.update(list => [{message, type, id: new Date().toISOString()}, ...list])
  }

  const removeSnackbar = (id) => () => {
    alert(`Should remove snack with id: ${id}`);
  }

  setContext(key, {
    isXl,
    isLg,
    snackbars,
    addSnackbar, removeSnackbar
  });

</script>

<svelte:window 
  bind:innerWidth
/>
<slot />
