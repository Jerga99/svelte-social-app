
<script>
  let isOpen = false;
</script>

<div class="relative">
  <div class="flex-it">
    <button on:click={() => isOpen = true}>
      <slot />
    </button>
  </div>
  {#if isOpen}
    <div class="flex-it w-20 h-20 fixed bg-black bottom-10 popup">
      Hello World
    </div>
  {/if}
</div>
