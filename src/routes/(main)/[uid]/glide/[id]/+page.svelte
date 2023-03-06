
<script>
  import { page } from "$app/stores";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  
  const { glide } = createGlideIdStore($page.params.uid, $page.params.id);

  $: {
    console.log($glide);
  }

</script>

<div>
  Hello There
</div>
