<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import type { Action, Game, Player } from '$lib/api/types';
	import { flip } from 'svelte/animate';
	import Todo from './Todo.svelte';
	import { set } from 'zod';

	interface ActionWithPlayer {
		action: Action;
		player: Player;
	}

	export let data: PageData;
	const game = writable<Game>(data.game);
	let roundFilter = writable($game.round);
	let { players } = data;
	let playerMap = new Map(players.map((player) => [player.id, player]));
	const client = new ApiClient();

	const actions = writable<ActionWithPlayer[]>();
	if (data.actions != null) {
		let actionsWithPlayers = data.actions.map((action) => {
			const player = playerMap.get(action.player_id);
			return { action, player };
		});
		actions.set(actionsWithPlayers.sort((a, b) => a.action.priority - b.action.priority));
	}
</script>

<main class="flex flex-col gap-4 p-4 mx-auto">
	<h1 class="sm:text-9xl text-5xl text-center p-9">{$game.name} Action Queue</h1>

	<h1 class="sm:text-4xl text-2xl text-center">Filter By Round</h1>
	<div class="grid grid-cols-3 gap-4 mx-auto p-4 bg-base-300 rounded-md w-64">
		<button
			class="btn btn-accent"
			on:click={() => {
				roundFilter.set($roundFilter - 1);
			}}>-</button
		>
		<h2 class="text-3xl font-bold text-center">
			{$roundFilter}
		</h2>
		<button
			class="btn btn-accent"
			on:click={() => {
				roundFilter.set($roundFilter + 1);
			}}>+</button
		>
	</div>
	{#if $actions}
		<div class="flex flex-col sm:flex-row gap-4 p-4 mx-auto text-xl">
			<div>
				<h2 class="text-3xl font-bold text-center">Current Queue</h2>
				<Todo {actions} done={false} {game} {roundFilter} />
			</div>
			<div>
				<h2 class="text-3xl font-bold text-center">Completed Queue</h2>
				<Todo {actions} done={true} {game} {roundFilter} />
			</div>
		</div>
	{/if}
</main>
