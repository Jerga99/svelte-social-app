
<script>
  let isEditing = false;
</script>


{#if isEditing}
  <div class="flex-it">
    <textarea />
    <button 
      on:click={() => isEditing = false}
      class="flex underline">Close
    </button>
  </div>
{:else}
  <button on:click={() => isEditing = true}>
    <slot />
  </button>
{/if}




