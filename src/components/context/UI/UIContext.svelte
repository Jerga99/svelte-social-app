
<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let documentBody = writable({});
  let isXl = writable(false);
  let isLg = writable(false);

  onMount(() => {
    handleResize();
    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    }
  })

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

<slot />
