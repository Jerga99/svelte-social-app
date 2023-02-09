
<script>
  import "../app.css";
</script>

<div class="text-white p-20 bg-yellow-500">
  I am root layout
  <slot />
</div>

-------------
-------------

<div class="text-white p-20 bg-yellow-500">
  I am root layout
  <div class="text-white p-4 bg-blue-500">
    I am task manager layout
    <div class="text-white">
      I am a task manager page
    </div>
  </div>
</div>
