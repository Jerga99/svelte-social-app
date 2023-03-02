<script>
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideStore } from "@stores/createGlideStore";
  import GlidePost from "../../components/glides/GlidePost.svelte";

  const { glides, addGlide } = createGlideStore();

</script>

<Messenger 
  onGlidePosted={addGlide}
/>
<div class="h-px bg-gray-700 my-1" />
{#each $glides as glide (glide.id)}
  <GlidePost {glide} />
{/each}

