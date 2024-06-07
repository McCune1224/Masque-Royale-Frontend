<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Action, AnyAbilityDetails, Game, Player } from '$lib/api/types';
	import { writable } from 'svelte/store';

	const client = new ApiClient();

	export let actionOptions: AnyAbilityDetails[];
	export let game: Game;
	export let player: Player;

	let loading = writable(false);
	async function handleSubmit(event) {
		event.preventDefault();
		loading.set(true);
		const form = event.target;
		const formData = new FormData(form);
		console.log(formData);
		const actionName = formData.get('action_name');
		const target = formData.get('target');
		const context = formData.get('context') || '';

		const payload: Action = {
			game_id: game.id,
			player_id: player.id,
			pending_approval: true,
			resolved: false,
			target: target,
			context: context || '...',
			ability_name: actionName
		};

		console.log(payload);
		const response = await client.gameApi.createGameAction(game.id, payload);
		console.log(response);
		loading.set(false);
	}
</script>

<form on:submit={handleSubmit} class="bg-base-300 p-4 flex flex-col rounded-xl gap-8">
	<p>{game.name}</p>
	<div class="flex flex-col gap-4">
		<label class="form-control flex items-center gap-2 text-xl" for="action_name"></label>
		<div class="label">Select an Action:</div>
		<select class="select select-bordered" name="action_name">
			{#each actionOptions as action}
				<option value={action.name}>{action.name}</option>
			{/each}
		</select>
	</div>
	<label class="form-control flex flex-col gap-2" for="target">
		<div class="label">Type a Target</div>
		<input
			required
			name="target"
			type="text"
			placeholder="Target Here"
			class="input input-bordered"
		/>
	</label>

	<div class="flex flex-col gap-2">
		<label class="flex items-center gap-2 text-xl" for="context"
			>Context/Details:
			<p class="text-sm">(optional)</p></label
		>
		<textarea class="textarea textarea-bordered" name="name" />
	</div>
	{#if $loading}
		<button class="btn">
			<span class="loading loading-spinner"></span>
			Sending...
		</button>
	{:else}
		<button class="btn btn-accent" type="submit">Submit Request</button>
	{/if}
</form>
