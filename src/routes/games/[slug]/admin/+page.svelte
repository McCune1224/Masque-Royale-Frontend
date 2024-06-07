<script lang="ts">
	//get pblic key from env
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { writable, derived, type Writable } from 'svelte/store';
	import { roleSubmitting, anyAbilitySubmitting } from './stores';
	import AddPlayerPanel from '$lib/components/admin/AddPlayerPanel.svelte';
	import type { PageServerData } from './$types';
	import PlayerAdminCard from '$lib/components/admin/PlayerAdminCard.svelte';
	import type { Player } from '$lib/api/types';

	export let data: PageServerData;
	const { roles } = data;
	const { rooms } = data;
	const { players } = data;

	const playerStore = writable<Player[]>([]);
	if (players) {
		playerStore.set(players);
	}

	// @ts-ignore - FIXME: Fix this, LayoutServerLoad is returning the game, but it thinks it's null for some reason
	const game: Game = data.game;

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
</script>

<section class="flex flex-col justify-center gap-4 sm:px-9 px-3">
	<h1 class="sm:text-9xl text-5xl text-center p-9">{game.name} Admin Panel</h1>

	{#if roles && rooms}
		<AddPlayerPanel data={data.playerCreateForm} {roles} {rooms} />
	{/if}

	{#if players != undefined}
		<h2 class="font-bold">Players</h2>
		<div class="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4">
			{#each $playerStore.sort((a, b) => a.name.localeCompare(b.name)) as player}
				<PlayerAdminCard {player} {playerStore} />
			{/each}
		</div>
	{/if}

	<form class="flex flex-row gap-4 p-4" on:submit={handleRoleSubmit} enctype="multipart/form-data">
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
</section>
