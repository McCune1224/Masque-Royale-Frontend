<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import { writable } from 'svelte/store';
	import { ApiClient } from '$lib/api/client';
	import type { Category } from '$lib/api/types';

	export let data: PageServerData;
	const client = new ApiClient();

	const { currentPlayer, currentRole, error } = data;
</script>

<main class="gap-4 flex flex-col sm:px-9 p-3">
	{#if currentPlayer}
		{#if error}
			<div class="bg-error text-base-content">{error}</div>
		{/if}

		<h1 class="sm:text-9xl text-5xl text-center p-1">
			{currentPlayer.name}
		</h1>
		<h2 class="sm:text-7xl text-4xl text-primary text-center">
			{currentRole.role.name}
			<p class="text-primary text-2xl sm:text-3xl">{currentRole.role.alignment}</p>
		</h2>

		<div class="flex flex-col gap-4 bg-base-300 p-4 rounded-lg">
			<div>
				<p class="text-3xl font-bold">Abilities</p>
				<div class="flex flex-col gap-8 p-5">
					{#each currentRole.abilities as ability}
						<div class="flex flex-col gap-3">
							<p class="text-xl font-bold">{ability.name}</p>
							<p>{ability.description}</p>
							<p>Default Charges {ability.default_charges}</p>
						</div>
					{/each}
				</div>
			</div>
			<div>
				<p class="text-3xl font-bold">Passives</p>
				<div class="flex flex-col gap-8 p-5">
					{#each currentRole.passives as passive}
						<div class="flex flex-col gap-3">
							<p class="text-xl font-bold">{passive.name}</p>
							<p>{passive.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</main>
