
<script>
  import { setContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let snackbars = writable([
    { message: "You have been logged in!", type: "success" }, 
    { message: "Ooops, something went wrong", type: "error" }, 
    { message: "Please, verify your profile", type: "warning" }
  ]);

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
