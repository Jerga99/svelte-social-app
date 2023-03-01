<script>
  import { getUIContext } from "@components/context/UI";
  import { flip } from "svelte/animate";
  import SnackbarItem from "./SnackbarItem.svelte";

  const { snackbars, removeSnackbar } = getUIContext();
</script>

<div class="fixed z-50 top-0 right-0 p-4 w-ful md:max-w-xs">
  <ul class="flex flex-col space-y-2">
    {#each $snackbars as snackbar (snackbar.id)}
      <div animate:flip={{duration: 300}}>
        <SnackbarItem 
          message={snackbar.message} 
          type={snackbar.type}
          onClose={removeSnackbar(snackbar.id)}
        />
    </div>
    {/each}
  </ul>
</div>
