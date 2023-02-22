
<script>
  import { page } from "$app/stores";
</script>

<div class="flex-it justify-center items-center h-full text-white">
  <div class="text-center">
    <div class="text-4xl font-bold">
      {$page.status} - {$page.error.message}
    </div>
    <a href="/" class="underline block text-center">Go to home page</a>
  </div>
</div>
