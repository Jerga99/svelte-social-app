<script>
  import TiArrowLeftOutline from 'svelte-icons/ti/TiArrowLeftOutline.svelte'
</script>

<button on:click={() => history.back()}>
  <div class="flex-it flex-row items-center text-xl cursor-pointer">
    <div class="icon">
      <TiArrowLeftOutline />
    </div>
    <div class="ml-5 font-bold">Back</div>
  </div>
</button>
