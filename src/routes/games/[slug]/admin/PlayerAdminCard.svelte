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
				playerAbilities.set(
					await client.playerApi.getPlayerAbilities(game_id, player.id.toString())
				),
				playerNotes.set(await client.playerApi.getPlayerNotes(game_id, player.id.toString()))
			]);
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
		<div class="flex flex-row">
			<p class="text-2xl">{player.name}</p>
			<span class="span text-sm">{room.name}</span>
		</div>
		<div class="">
			{#if $playerAbilities}
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn m-1">Inventory</div>
					<div
						tabindex="0"
						class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-neutral border-2 text-secondary-content"
					>
						{#each $playerAbilities as ability}
							<PlayerAbilityForm {ability} />
						{/each}
					</div>
				</div>
			{/if}
			<!-- You can open the modal using ID.showModal() method -->
			<div class="flex flex-col gap-2">
				{#if $playerNotes}
					<p>Player Notes</p>
					<textarea class="textarea textarea-accent textarea-lg" bind:value={$playerNotes.notes} />
				{/if}
				<button
					class={`btn ${loadingAddNotes ? 'btn-disabled' : 'btn-accent'}`}
					on:click={handleAddNotes}
				>
					{#if loadingAddNotes}
						<span class="loading loading-spinner w-25"></span>
					{/if}
					Save Notes</button
				>
				<button
					class={`btn ${!player.alive ? '' : 'btn-accent'} ${loadingAliveToggle ? 'btn-disabled' : ''}`}
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
				<!-- Open the modal using ID.showModal() method -->
				<button class="btn btn-accent" onclick={`player_${player.id}.showModal()`}
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
									<button class="btn btn-accent">Cancel</button>
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
