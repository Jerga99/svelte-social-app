
<script>
  import { goto } from "$app/navigation";
  import { getAuthContext } from "@components/context/auth";

  const { isAuthenticated } = getAuthContext();

  if ($isAuthenticated) {
    goto("/");
  }

</script>

{#if !$isAuthenticated}
  <slot />
{/if}
  
