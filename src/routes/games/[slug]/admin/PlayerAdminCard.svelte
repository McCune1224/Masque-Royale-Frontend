<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { ApiClient } from '$lib/api/client';
	import type { Player, PlayerAbility, Role, Room } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import PlayerAbilityForm from './PlayerAbilityForm.svelte';

	export let player: Player;
	export let playerStore: Writable<Player[]>;
	export let game_id: string;
	export let role: Role;
	const client = new ApiClient();
	let room: Room;
	let playerNotes = writable<{ player_id: number; notes: string }>();
	let playerAbilities = writable<PlayerAbility[]>();
	const initialLoading = writable(true);
	onMount(async () => {
		room = await client.roomApi.getRoom(player.room_id);
		initialLoading.set(false);

		try {
			Promise.all([
				client.playerApi.getPlayerAbilities(game_id, player.id.toString()),
				client.playerApi.getPlayerNotes(game_id, player.id.toString())
			]).then(([abilitiesResp, notesResp]) => {
				playerAbilities.set(abilitiesResp);
				playerNotes.set(notesResp);
			});
		} catch (error) {
			console.log(error);
		}
	});

	let loadingAliveToggle = false;
	let loadingDeletePlayer = false;
	async function handleToggleAlive() {
		loadingAliveToggle = true;
		player.alive = !player.alive;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loadingAliveToggle = false;
		} catch (error) {
			console.log(error);
			loadingAliveToggle = false;
		}
	}

	async function handleDeletePlayer() {
		loadingDeletePlayer = true;
		try {
			const response = await client.playerApi.deletePlayer(player);
			playerStore.update((cp: Player[]) => {
				return cp.filter((p: Player) => p.id !== player.id);
			});
			loadingDeletePlayer = false;
		} catch (error) {
			console.log(error);
			loadingDeletePlayer = false;
		}
	}

	let loadingAddNotes = false;
	async function handleAddNotes() {
		loadingAddNotes = true;
		loadingAddNotes = true;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loadingAddNotes = false;
		} catch (error) {
			console.log(error);
			loadingAddNotes = false;
		}
	}

	let loadingChangeRoom = false;
	async function handleChangeRoom() {
		loadingChangeRoom = true;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loadingChangeRoom = false;
		} catch (error) {
			console.log(error);
			loadingChangeRoom = false;
		}
	}
</script>

<div
	class={'text-center bg-neutral p-8 ' +
		(player.alive ? '' : 'border-2 border-dashed border-white opacity-50')}
>
	{#if !$initialLoading}
		<h2 class="indicator text-4xl place-items-center">
			{player.name}
		</h2>
		<span class="indicator-item badge">{room.name}</span>
		<div class="grid grid-cols-2 gap-4">
			{#if $playerAbilities}
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-primary w-full">Abilities</div>
					<div
						tabindex="0"
						class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-neutral border-2"
					>
						{#each $playerAbilities as ability}
							<PlayerAbilityForm {game_id} player_id={player.id.toString()} {ability} />
						{/each}
					</div>
				</div>
			{/if}
			<button
				class={`btn ${!player.alive ? '' : 'btn-primary'} ${loadingAliveToggle ? 'btn-disabled' : ''}`}
				on:click={handleToggleAlive}
			>
				{#if loadingAliveToggle}
					<span class="loading loading-spinner"></span>
				{/if}
				{#if !player.alive}
					Mark Alive
				{:else}
					Mark Dead
				{/if}
			</button>
		</div>

		<div class="flex flex-col gap-2">
			{#if $playerNotes}
				<textarea class="textarea textarea-primary textarea-lg" bind:value={$playerNotes.notes} />
			{/if}
			<button
				class={`btn ${loadingAddNotes ? 'btn-disabled' : 'btn-primary'}`}
				on:click={handleAddNotes}
			>
				{#if loadingAddNotes}
					<span class="loading loading-spinner w-25"></span>
				{/if}
				Save Notes</button
			>

			<div class="flex justify-start">
				<button class="btn btn-xs btn-error" onclick={`player_${player.id}.showModal()`}
					>Delete Player</button
				>
				<dialog id={`player_${player.id}`} class="modal modal-middle sm:modal-middle">
					<div class="modal-box">
						<h3 class="font-bold text-lg">CAUTION: Deleting a player is not revertable</h3>
						<p class="py-4">
							Only hit Delete if you're CERTAIN this player will not be playing anymore.
						</p>
						<div class="modal-action">
							<form method="dialog">
								<!-- if there is a button in form, it will close the modal -->
								<div class="flex gap-8">
									<button class="btn btn-error" on:click={handleDeletePlayer}>Delete Player</button>
									<button class="btn btn-primary">Cancel</button>
								</div>
							</form>
						</div>
					</div>
				</dialog>
			</div>
		</div>
	{:else}
		<span class="loading loading-spinner text-info"></span>
	{/if}
</div>
