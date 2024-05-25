<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	// export const actData: ActionData;

	const errorStore = getToastStore();

	onMount(() => {
		if (data.error) {
			errorStore.trigger({
				message: data.error
			});
		}
	});
</script>

<section class="container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0">
	<h1 class="h1 text-6xl text-center">Masque Royale</h1>

	<div class="bg-zinc-800 p-4 text-token">
		<h2 class="h2 text-center">New Game</h2>
		<form class="flex flex-col" method="POST">
			<label class="label" for="name"
				>Name
				<input class="input" type="text" name="name" />
			</label>

			<button class="btn btn-lg variant-glass-primary">Submit</button>
		</form>
	</div>

	{#if data.games}
		<div class="bg-zinc-800">
			<h2 class="h2 text-center bg-zinc-800 py-3">Current Games</h2>
			<div class="flex flex-col gap-4">
				{#each data.games as game}
					<div class="flex flex-col gap-1 text-center">
						<div>
							<h4 class="h4">{game.name}</h4>
							<p class="text-md">{game.player_ids ?? 0} Players</p>
						</div>
						<a
							class="btn btn-sm variant-glass-primary"
							href={`games/${game.id}/join`}
							rel="noreferrer">Join Game</a
						>
						<a
							class="btn btn-sm variant-glass-primary"
							href={`games/${game.id}/admin`}
							rel="noreferrer">Admin Join</a
						>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
