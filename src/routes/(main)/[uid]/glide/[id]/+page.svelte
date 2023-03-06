
<script>
  import { page } from "$app/stores";
  import GlidePost from "@components/glides/GlidePost.svelte";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  
  const { glide, loading } = createGlideIdStore($page.params.uid, $page.params.id);

</script>

{#if $loading}
  <CenteredDataLoader />
{:else if $glide}
  <GlidePost glide={$glide} />
  <div class="p-4 border-b-1 border-solid border-gray-700">
    <div class="text-sm italic text-gray-300 underline mb-2">
      Answering to: {$glide.user.nickName}
    </div>
    <Messenger showAvatar={false} onGlidePosted={() => {}} />
  </div>
{/if}
