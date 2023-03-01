<script>
  import { goto } from "$app/navigation";
  import { getAuthContext } from "@components/context/auth";
  import MainLayout from "@components/layouts/MainLayout.svelte";

  const { auth } = getAuthContext();

  export let data;

  $: {
    if (!$auth.isAuthenticated) {
      goto("/auth/login");
    }
  }

</script>

{#if $auth.isAuthenticated}
  <MainLayout trends={data.trends}>
    <slot />
  </MainLayout>
{/if}
