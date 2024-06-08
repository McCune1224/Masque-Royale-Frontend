<script lang="ts">
	import { flip } from 'svelte/animate';
	import { send, receive } from './transition';
	import type { Action, Game, Player } from '$lib/api/types';
	import type { Writable } from 'svelte/store';
	import { ApiClient } from '$lib/api/client';

	const client = new ApiClient();

	interface ActionWithPlayer {
		action: Action;
		player: Player;
	}

	export let done;
	export let game: Writable<Game>;
	export let actions: Writable<ActionWithPlayer[]>;
	export let roundFilter: Writable<number>;

	// actions.set($actions.filter((action) => action.round === $roundFilter));
	// actions.update((actions) => {
	// 	actions.filter((action) => action.round === $roundFilter);
	// 	return actions;
	// });
</script>

<ul class="todos flex flex-col gap-3">
	{#each $actions.filter((currAction) => currAction.action.pending_approval !== done && currAction.action.round === $roundFilter) as currAction (currAction.action.id)}
		<li
			in:receive={{ key: currAction.action.id }}
			out:send={{ key: currAction.action.id }}
			animate:flip={{ duration: 50 }}
			class={' prose min-w-48 max-w-md sm:min-w-64 sm:max-w-lg bg-base-200 p-2 rounded-md shadow-md'}
		>
			<label class="flex justify-between bg-base-200 p-2">
				<span class="text-lg">
					<p>Requested By: {currAction.player.name}</p>
					<p>Target: {currAction.action.target}</p>
					<p>Ability: {currAction.action.ability_name}</p>
					<p>Context: {currAction.action.context}</p>
					<p class="text-xs">( Queue Position: {currAction.action.priority} )</p>
				</span>
				<input
					class="checkbox checkbox-success"
					type="checkbox"
					checked={done}
					on:click={(e) => {
						let foo = currAction.action;
						foo.pending_approval = done;
						client.gameApi.updateAction($game.id.toString(), currAction.action.id.toString(), foo);
						actions.update((actions) => {
							actions.filter(
								(action) => action.action.id === currAction.action.id
							)[0].action.pending_approval = done;
							return actions;
						});
					}}
				/>
			</label>
			<button
				class="btn btn-xs btn-error"
				on:click={() => {
					client.gameApi.deleteAction($game.id.toString(), currAction.action.id.toString());
					$actions = $actions.filter((action) => action.action.id !== currAction.action.id);
				}}>Delete / Decline</button
			>
		</li>
	{/each}
</ul>
