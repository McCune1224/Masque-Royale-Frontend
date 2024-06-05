<script lang="ts">
	import type { AnyAbilityDetails } from '$lib/api/types';
	function handleSubmit(event) {
		event.preventDefault();
		console.log('Submitted');
	}

	export let actionOptions: AnyAbilityDetails[];
</script>

<form class="bg-base-300 p-4 flex flex-col rounded-xl gap-8">
	<div class="flex flex-col gap-4">
		<label class="flex items-center gap-2 text-xl" for="name">Select an Action:</label>
		<select class="text-xl">
			{#each actionOptions as action}
				<option value={action.id}>{action.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-2">
		<label class="input input-bordered flex items-center gap-2 text-xl" for="name">
			<input type="text" class="grow" name="name" placeholder="Target" />
		</label>
	</div>

	<div class="flex flex-col gap-2">
		<label class="flex items-center gap-2 text-xl" for="name">Context/Details:</label>
		<textarea name="name" class="grow" placeholder="Daisy" />
		<button class="btn btn-accent" on:click={handleSubmit}>Submit Request</button>
	</div>
</form>
