
<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let documentBody = writable({});
  let isXl = writable(false);
  let isLg = writable(false);

  let innerHeight;
  let innerWidth;

  $: {
    console.log(innerWidth);
    console.log(innerHeight);
  }

  function handleResize() {
    $documentBody = getSize();
    $isXl = $documentBody.width > 1280;
    $isLg = $documentBody.width > 1024;
  }

  function getSize() {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth
    };
  }

  setContext(key, {
    documentBody,
    isXl,
    isLg
  });

</script>

<svelte:window 
  bind:innerWidth
  bind:innerHeight
/>
<slot />
