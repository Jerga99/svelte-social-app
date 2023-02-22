
<script>
  import { beforeUpdate, afterUpdate, onMount } from "svelte";

  let isOpen = false;

  onMount(() => {
    addEventListener("click", closePopup);
  })

  beforeUpdate(() => {
    console.log("before update called!");
  })

  afterUpdate(() => {
    console.log("after update called!");
  })

  function closePopup() {
    if (isOpen) isOpen = false;
  }

</script>

<div class="flex-it">
  <div class="flex-it">
    <button on:click|stopPropagation={() => {
      isOpen = true;
    }}>
      <slot />
    </button>
  </div>
  {#if isOpen}
    <div class="flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000">
      <div class="w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto">
        <div class="flex-it flex-grow flex-shrink py-3">
          <div class="flex-it px-4 py-3 transition hover:bg-gray-700">Logout</div>
        </div>
      </div>
    </div>
  {/if}
</div>
