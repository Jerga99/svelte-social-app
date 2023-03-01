
<script>
  import { goto } from "$app/navigation";
  import { getAuthContext } from "@components/context/auth";

  const { auth } = getAuthContext();

  $: {
    if ($auth.isAuthenticated) {
      goto("/");
    }
  }

</script>

{#if !$auth.isAuthenticated}
  <slot />
{/if}
  
