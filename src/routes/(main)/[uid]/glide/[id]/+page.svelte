
<script>
  import { page } from "$app/stores";
  import { fetchGlide } from "@api/glides";
  import { onMount } from "svelte";

  onMount(async () => {
    const glide = await fetchGlide($page.params.uid, $page.params.id);
    console.log(glide);
  })
</script>

<div>
  uid: {$page.params.uid}
</div>

<div>
  id: {$page.params.id}
</div>
