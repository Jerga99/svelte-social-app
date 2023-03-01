<script>
  import { getUIContext } from "@components/context/UI";
  import SnackbarItem from "./SnackbarItem.svelte";

  const { snackbars } = getUIContext();
</script>

<div class="fixed z-50 top-0 right-0 p-4 w-ful md:max-w-xs">
  <ul class="flex flex-col space-y-2">
    {#each $snackbars as snackbar (snackbar)}
      <SnackbarItem 
        message={snackbar.message} 
        type={snackbar.type}
      />
    {/each}
  </ul>
</div>
