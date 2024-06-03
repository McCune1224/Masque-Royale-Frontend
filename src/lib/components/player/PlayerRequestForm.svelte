<script lang="ts">
	function handleSubmit(event) {
		event.preventDefault();
		console.log('Submitted');
	}
</script>

<div class="">
	<form>
		<div class="flex flex-col gap-3">
			<label for="name">Select an Action</label>
			<select>
				<option value="1">Action 1</option>
				<option value="2">Action 2</option>
			</select>
		</div>
		<div class="flex flex-col">
			<label for="name">Select a Player</label>
			<select>
				<option value="1">Player 1</option>
				<option value="2">Player 2</option>
				<option value="3">Player 3</option>
			</select>
		</div>
		Context/Details:
		<textarea name="name" class="grow" placeholder="Daisy" />
		<button class="btn btn-accent" on:click={handleSubmit}>Submit Request</button>
	</form>
</div>
