
<script>
  export let errors;
</script>

{#if errors?.length > 0}
  <div class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
    {#each errors as error}
      <div>{error}</div>
    {/each}
  </div>
{/if}
