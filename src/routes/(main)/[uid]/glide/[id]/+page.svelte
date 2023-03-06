
<script>
  import { page } from "$app/stores";
  import GlidePost from "@components/glides/GlidePost.svelte";
  import CenteredDataLoader from "@components/utils/CenteredDataLoader.svelte";
  import Messenger from "@components/utils/Messenger.svelte";
  import { createGlideIdStore } from "@stores/createGlideIdStore";
  import { pageStore } from "@stores/pageStore";
  import BackButton from "@components/utils/BackButton.svelte";
  import { createSubglideStore } from "@stores/createSubglideStore";
  import { onMount } from "svelte";
  
  const { glide, loading } = createGlideIdStore($page.params.uid, $page.params.id);
  const { pages, loadGlides} = createSubglideStore();

  pageStore.title.set(BackButton);

  onMount(() => {
    loadGlides();
  });

  $: {
    console.log($pages);
  }

</script>

{#if $loading}
  <CenteredDataLoader />
{:else if $glide}
  <GlidePost glide={$glide} />
  <div class="p-4 border-b-1 border-solid border-gray-700">
    <div class="text-sm italic text-gray-300 underline mb-2">
      Answering to: {$glide.user.nickName}
    </div>
    <Messenger 
      glideLookup={$glide.lookup}
      showAvatar={false} 
      onGlidePosted={() => {}} 
    />
  </div>
{/if}
