<script lang="ts">
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const { game, players } = data;
</script>

<div>
	<h1 class="sm:text-9xl text-5xl text-center p-9">{game.name} Player Join</h1>
	<div class="flex flex-col gap-8">
		{#if players}
			{#each players.sort((a, b) => a.name.localeCompare(b.name)) as player}
				<div class="flex flex-col gap-3 bg-neutral p-8 border-2 border-base-200">
					<p class="text-3xl font-bold text-center">{player.name}</p>
					<a href={`/games/${game.id}/players/${player.id}`} class="btn btn-primary">Player Join</a>
				</div>
			{/each}
		{/if}
	</div>
</div>
