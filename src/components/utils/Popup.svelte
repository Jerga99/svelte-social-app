
<script>
  import { afterUpdate, onMount } from "svelte";
  import Portal from "./Portal.svelte";
  import { clickOutside } from "@actions/clickOutside";
  import { logoutUser } from "@api/auth";

  let isOpen = false;

  let openerMenu;
  let popup;

  let popupBottomPosition;
  let popupLeftPosition;

  onMount(() => {
    addEventListener("resize", adjustPopup);
    
    return () => {
      removeEventListener("resize", adjustPopup);
    }
  })

  afterUpdate(() => {
    adjustPopup();
  })

  function adjustPopup() {
    if (isOpen) {
      const position = openerMenu.getBoundingClientRect();

      popupBottomPosition = openerMenu.clientHeight + "px";
      popupLeftPosition = position.left + "px";
    }
  }

  async function logout() {
    await logoutUser();
  }

</script>

<div class="flex-it">
  <div bind:this={openerMenu} class="flex-it">
    <button on:click|stopPropagation={() => {
      isOpen = !isOpen;
    }}>
      <slot />
    </button>
  </div>
  {#if isOpen}
    <Portal>
      <div 
        on:outclick={() => {
          isOpen = false;
        }}
        use:clickOutside
        bind:this={popup}
        style="bottom: {popupBottomPosition}; left: {popupLeftPosition}"
        class="flex-it hover:cursor-pointer fixed bg-gray-800 text-white popup z-10 rounded-2xl border-gray-700 border transition duration-1000"
      >
        <div class="w-72 min-w-68 max-h-120 min-h-8 flex-it overflow-auto">
          <div class="flex-it flex-grow flex-shrink py-3">
            <button 
              on:click={logout}
              class="flex-it items-start px-4 py-3 transition hover:bg-gray-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Portal>
  {/if}
</div>
