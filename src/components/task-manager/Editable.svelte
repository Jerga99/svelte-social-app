
{#if true}
  <div class="flex-it">
    <textarea />
    <button class="flex underline">Close</button>
  </div>
{:else}
  <button>
    <slot />
  </button>
{/if}




