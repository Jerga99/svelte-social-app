
<script>
  export let value;
  let isEditing = false;
</script>


{#if isEditing}
  <div class="flex-it">
    <textarea bind:value />
    <button 
      on:click={() => isEditing = false}
      class="flex underline">Close
    </button>
    <div>{value}</div>
  </div>
{:else}
  <button on:click={() => isEditing = true}>
    <slot />
  </button>
{/if}




