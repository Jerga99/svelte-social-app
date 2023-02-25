<script>
  import { goto } from "$app/navigation";
  import { getAuthContext } from "@components/context/auth";
  import MainLayout from "@components/layouts/MainLayout.svelte";

  const { isAuthenticated } = getAuthContext();

  export let data;

  if (!$isAuthenticated) {
    goto("/auth/login");
  }

</script>

{#if $isAuthenticated}
  <MainLayout trends={data.trends}>
    <slot />
  </MainLayout>
{/if}
