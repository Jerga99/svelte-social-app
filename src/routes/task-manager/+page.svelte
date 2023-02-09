
<script>
  let count = 0;
</script>

<div class="text-white">
  <div>I am a task manager page - {count}</div>

  <button on:click={() => {
    count++;
  }}>
    Increment
  </button>
</div>
