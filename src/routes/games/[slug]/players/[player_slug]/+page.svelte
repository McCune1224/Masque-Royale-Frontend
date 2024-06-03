<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { currentPlayer, currentRole, error } = data;
</script>

<main class="gap-4 flex flex-col p-9">
	{#if currentPlayer}
		{#if error}
			<div class="bg-error text-base-content">{error}</div>
		{/if}
		<h1 class="sm:text-9xl text-5xl text-center p-9">
			{currentPlayer.name} - {currentRole.role.name} - {currentRole.role.alignment}
		</h1>

		<p class="text-xl font-bold">Passives</p>
		<div class="flex flex-col gap-8">
			{#each currentRole.abilities as ability}
				<div class="flex flex-col gap-3">
					<p class="text-3xl font-bold">{ability.name} - {ability.id}</p>
					<p>{ability.description}</p>
					<p>Charges {ability.default_charges}</p>
				</div>
			{/each}
		</div>

		<p class="text-xl font-bold py-9">Passives</p>
		<div class="flex flex-col gap-8">
			{#each currentRole.passives as passive}
				<div class="flex flex-col gap-3">
					<p class="text-xl font-bold">{passive.name} - {passive.id}</p>
					<p>{passive.description}</p>
				</div>
			{/each}
		</div>
	{/if}
</main>
