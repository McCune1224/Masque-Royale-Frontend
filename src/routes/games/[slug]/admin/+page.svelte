<script lang="ts">
	//get pblic key from env
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { writable, derived, type Writable } from 'svelte/store';
	import { roleSubmitting, anyAbilitySubmitting } from './stores';
	import { goto } from '$app/navigation';
	import type { PageData, PageServerData } from './$types';
	import PlayerAdminCard from './PlayerAdminCard.svelte';
	import type { Game, Player } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import PlayerCreateForm from './PlayerCreateForm.svelte';

	const client = new ApiClient();
	export let data: PageServerData;
	const { roles } = data;
	const { rooms } = data;
	const { players } = data;
	const { game } = data as PageData;

	const playerStore = writable<Player[]>([]);
	if (players) {
		playerStore.set(players);
	}

	const gameStore = writable<Game>(game);

	function formPost(url: string, state: Writable<boolean>) {
		return async (event) => {
			state.set(true);
			event.preventDefault();

			const form = event.target;
			const formData = new FormData(form);

			try {
				const response = await fetch(PUBLIC_BACKEND_URL + url, {
					method: 'POST',
					body: formData
				});
				const result = await response.json();
				state.set(false);
			} catch (error) {
				console.log(error);
				state.set(false);
			}
			state.set(false);
		};
	}
	const handleRoleSubmit = formPost('/api/games/1/admin/sync-roles-csv', roleSubmitting);
	const handleAnyAbilitySubmit = formPost(
		'/api/games/1/admin/sync-any-abilities-csv',
		anyAbilitySubmitting
	);

	async function handleDeleteGame() {
		try {
			const response = await client.gameApi.deleteGame($gameStore.id.toString());
			goto('/');
		} catch (error) {}
	}
</script>

<section class="flex flex-col justify-center gap-4 sm:px-9 px-3">
	<h1 class="sm:text-9xl text-5xl text-center p-9">{$gameStore.name} Admin Panel</h1>
	<div class="grid grid-cols-3 gap-4 mx-auto p-4 bg-base-300 rounded-md w-64">
		<button
			class="btn btn-accent"
			on:click={() => {
				if ($gameStore.phase === 'Night') {
					$gameStore.phase = 'Day';
				} else {
					$gameStore.phase = 'Night';
					$gameStore.round = $gameStore.round - 1;
				}
				client.gameApi.updateGame($gameStore.id.toString(), $gameStore);
			}}>-</button
		>
		<h2 class="text-3xl font-bold text-center">
			{$gameStore.phase}
			{$gameStore.round}
		</h2>
		<button
			class="btn btn-accent"
			on:click={() => {
				if ($gameStore.phase === 'Day') {
					$gameStore.phase = 'Night';
				} else {
					$gameStore.phase = 'Day';
					$gameStore.round = $gameStore.round + 1;
				}
				client.gameApi.updateGame($gameStore.id.toString(), $gameStore);
			}}>+</button
		>
	</div>

	{#if roles && rooms}
		<PlayerCreateForm {playerStore} game_id={$gameStore.id.toString()} {roles} {rooms} />
	{:else}
		<form
			class="flex flex-row gap-4 p-4"
			on:submit={handleRoleSubmit}
			enctype="multipart/form-data"
		>
			<p class="text-xl font-bold">Upload Roles CSV</p>
			<label>
				<input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" />
			</label>
			{#if $roleSubmitting}
				<button class="btn btn-disabled" disabled
					>Updating Roles<span class="loading loading-ring loading-md"></span></button
				>
			{:else}
				<button class="btn btn-accent" type="submit">Submit </button>
			{/if}
		</form>

		<form
			class="flex flex-row gap-4 p-4"
			on:submit={handleAnyAbilitySubmit}
			enctype="multipart/form-data"
		>
			<p class="text-xl font-bold">Upload AnyAbilities CSV</p>
			<label>
				<input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" />
			</label>
			{#if $anyAbilitySubmitting}
				<button class="btn btn-disabled" disabled
					>Updating Any AnyAbilities<span class="loading loading-ring loading-md"></span></button
				>
			{:else}
				<button class="btn btn-accent" type="submit">Submit </button>
			{/if}
		</form>
	{/if}

	{#if players != undefined}
		<h2 class="font-bold">Players</h2>
		<div class="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
			{#each $playerStore.sort((a, b) => a.name.localeCompare(b.name)) as player}
				<PlayerAdminCard game_id={$gameStore.id.toString()} {player} {playerStore} />
			{/each}
		</div>
	{/if}

	<div class="flex flex-row gap-4 p-4">
		<!-- Open the modal using ID.showModal() method -->
		<button class="btn btn-accent" onclick="game_modal.showModal()">Delete Game</button>
		<dialog id="game_modal" class="modal modal-bottom sm:modal-middle">
			<div class="modal-box">
				<h3 class="font-bold text-lg">CAUTION: Deleting a player is not revertable</h3>
				<p class="py-4">
					WARNING: This will delete the game and all of its players. This cannot be undone.
				</p>
				<div class="modal-action">
					<form method="dialog">
						<!-- if there is a button in form, it will close the modal -->
						<div class="flex gap-8">
							<button on:click={handleDeleteGame} class="btn btn-error"> Delete Game</button>
							<button class="btn btn-accent">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	</div>
</section>
