<script>
  import Portal from "./Portal.svelte";
</script>

<div class="my-1 flex-it w-10/12 cursor-pointer">
  <div
    class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-it transition"
  >
    <div
      class="flex-it flex-row text-xl font-bold text-white items-start justify-center truncate duration-200"
    >
      Glide it
    </div>
  </div>
</div>
{#if true}
  <Portal>
    <div class="openModal">
      <div class="modal fixed min-w-160 top-14 left-2/4 p-8 -translate-x-1/2 rounded-2xl">
        <slot />
      </div>
    </div>
  </Portal>
{/if}
