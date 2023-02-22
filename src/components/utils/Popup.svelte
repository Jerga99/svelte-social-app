
<script>
  let isOpen = false;
</script>

<div class="relative">
  <button on:click={() => isOpen = true}>Open Me
  </button>
  {#if isOpen}
    <div class="flex-it w-20 h-20 fixed bg-black bottom-10 popup">
      Hello World
    </div>
  {/if}
</div>
