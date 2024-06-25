<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { ApiClient } from '$lib/api/client';
	import type { Player, PlayerAbility, Role, Room } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import PlayerAbilityForm from './PlayerAbilityForm.svelte';
	import PlayerDeleteButton from './PlayerDeleteButton.svelte';
	import PlayerNotesForm from './PlayerNotesForm.svelte';
	import PlayerMarkDeadButton from './PlayerMarkDeadButton.svelte';

	export let player: Writable<Player>;
	export let gamePlayersStore: Writable<Player[]>;
	export let game_id: string;
	export let role: Role;
	const client = new ApiClient();
	let room: Room;
	let playerNotes = writable<{ player_id: number; note: string }>();
	let playerAbilities = writable<PlayerAbility[]>();
	const initialLoading = writable(true);
	onMount(async () => {
		room = await client.roomApi.getRoom($player.room_id);
		initialLoading.set(false);

		try {
			Promise.all([
				client.playerApi.getPlayerAbilities(game_id, $player.id.toString()),
				client.playerApi.getPlayerNotes(game_id, $player.id.toString())
			]).then(([abilitiesResp, notesResp]) => {
				playerAbilities.set(abilitiesResp);
				playerNotes.set(notesResp);
			});
		} catch (error) {
			console.log(error);
		}
	});
</script>

<div class={'text-center bg-neutral p-2 shadow-2xl' + ($player.alive ? '' : ' opacity-50')}>
	{#if !$initialLoading}
		<h2 class="indicator text-4xl place-items-center">
			{$player.name}
		</h2>
		<span class="indicator-item badge">{room.name}</span>
		<div class="grid grid-cols-2 gap-4">
			{#if $playerAbilities}
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-sm btn-primary w-full">Abilities</div>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div
						tabindex="0"
						class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-neutral border-2"
					>
						{#each $playerAbilities as ability}
							<PlayerAbilityForm {game_id} player_id={$player.id.toString()} {ability} />
						{/each}
					</div>
				</div>
			{/if}
			<PlayerMarkDeadButton {player} playerStore={gamePlayersStore} />
		</div>

		<div class="py-2 flex flex-col gap-2">
			<PlayerNotesForm {game_id} {playerNotes} {player} gamePlayerStore={gamePlayersStore} />
			<PlayerDeleteButton {player} playerStore={gamePlayersStore} />
		</div>
	{:else}
		<span class="loading loading-spinner text-info"></span>
	{/if}
</div>
