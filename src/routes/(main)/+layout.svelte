<script>
  import MainLayout from "@components/layouts/MainLayout.svelte";

  export let data;
</script>


<MainLayout trends={data.trends}>
  <slot />
</MainLayout>
