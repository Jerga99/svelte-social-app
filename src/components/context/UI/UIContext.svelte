
<script>
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { key } from ".";

  let documentBody = writable({});

  onMount(() => {
    handleResize();
    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    }
  })

  function handleResize() {
    $documentBody = getSize();
  }

  function getSize() {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth
    };
  }

  setContext(key, {
    documentBody
  });

</script>

<slot />
