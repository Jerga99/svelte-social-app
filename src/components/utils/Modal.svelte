<script>
  import Portal from "./Portal.svelte";

  let isOpen = false;
</script>

<slot name="opener" />
{#if isOpen}
  <Portal>
    <div class="openModal">
      <div class="modal fixed min-w-160 top-14 left-2/4 p-8 -translate-x-1/2 rounded-2xl">
        <slot name="modal-content" />
      </div>
    </div>
  </Portal>
{/if}
