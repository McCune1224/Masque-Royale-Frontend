<script lang="ts">
	import { GamesGetAll, type Game } from '$lib/api/game';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	const errorStore = getToastStore();
	export let data: PageData;

	let games: Game[] | null;

	async function buttonAllGames() {
		try {
			const response = await GamesGetAll();
			games = response;
		} catch (err) {
			console.log((err = (err as Error).message));
			errorStore.trigger({
				message: 'Unable to fetch random game',
				timeout: 7000,
				background: 'variant-filled-error'
			});
		}
	}

	if (data.error) {
		onMount(() => {
			errorStore.trigger({
				message: data.error,
				timeout: 7000,
				background: 'variant-filled-error'
			});
		});
	}
</script>

<section class="container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0">
	<h1 class="h1 text-6xl text-center">Masque Royale</h1>

	{#if data.games}
		<div class="bg-tertiary-700">
			<h2 class="h2 text-center bg-secondary-800">Current Games</h2>
			<div class="flex flex-col gap-4">
				{#each data.games as game}
					<div class="flex flex-row gap-3 justify-evenly">
						<div>
							<h4 class="h4">{game.Name}</h4>
							<p class="text-md">{game.PlayerCount} Players</p>
						</div>
						<a
							class="btn btn-sm variant-ghost-tertiary"
							href={`games/${game.Id}/join`}
							rel="noreferrer">Join Game</a
						>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
