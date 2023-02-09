<script>
	let count = 0;

	$: {
		if (count > 10) {
			console.log('I am the winner!');
		}
	}
</script>

<div class="text-white">
	<div>I am a task manager page - {count}</div>

	<button
		on:click={() => {
			count++;
		}}
	>
		Increment
	</button>
</div>
