<script>
	let count = 0;

	$: {
		if (count > 10) {
			console.log('I am the winner!');
		}
	}

  $: doubled = count * 2;
  
</script>

<div class="text-white">
	<div>I am a task manager page - {count}</div>
  <div>Doubled value: {doubled}</div>
	<button
		on:click={() => {
			count++;
		}}
	>
		Increment
	</button>
</div>
