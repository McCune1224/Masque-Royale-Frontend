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
		<label class="form-control flex items-center gap-2 text-xl" for="name"></label>
		<div class="label">Select an Action:</div>
		<select class="select select-bordered">
			{#each actionOptions as action}
				<option value={action.id}>{action.name}</option>
			{/each}
		</select>
	</div>
	<label class="form-control flex flex-col gap-2">
		<div class="label">Type a Target</div>
		<input type="text" placeholder="Target Here" class="input input-bordered" />
	</label>

	<div class="flex flex-col gap-2">
		<label class="flex items-center gap-2 text-xl" for="name"
			>Context/Details:
			<p class="text-sm">(optional)</p></label
		>
		<textarea class="textarea textarea-bordered" name="name" />
		<button class="btn btn-accent" on:click={handleSubmit}>Submit Request</button>
	</div>
</form>
