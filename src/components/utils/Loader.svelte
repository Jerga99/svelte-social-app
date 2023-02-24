<script>
  import TiArrowSyncOutline from "svelte-icons/ti/TiArrowSyncOutline.svelte";
  export let size = 27;
</script>

<div class="flex-it text-white justify-center items-center h-full">
  <div class="rotating">
    <div class="icon" style="width: {size}px; height: {size}px" >
      <TiArrowSyncOutline />
    </div>
  </div>
</div>
