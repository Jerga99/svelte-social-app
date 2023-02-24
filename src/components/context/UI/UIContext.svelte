
<script>
  import { onMount } from "svelte";

  onMount(() => {
    console.log("Context was mounted!");
  })
</script>

<slot />
