
<script>
  import { page } from "$app/stores";
  import { fetchGlide } from "@api/glides";
  import { onMount } from "svelte";

  onMount(() => {
    fetchGlide($page.params.uid, $page.params.id);
  })
</script>

<div>
  uid: {$page.params.uid}
</div>

<div>
  id: {$page.params.id}
</div>
