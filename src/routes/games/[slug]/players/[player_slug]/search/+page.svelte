<script lang="ts">
	import type { AbilityDetails, Status, Role } from '$lib/api/types';
	import { derived, writable } from 'svelte/store';
	import type { PageLoad } from './$types';
	import { ApiClient } from '$lib/api/client';
	import AbilityCard from './AbilityCard.svelte';

	const client = new ApiClient();

	//WARNING: Imagine a world where sveltekit exports $types correcetly. allAbilities does in fact exist...
	export let data: PageLoad;
	const statuses: Status[] = data.statuses;
	const dataAbilities: AbilityDetails[] = data.allAbilities;
	const allAbilities = writable(
		dataAbilities.sort((a, b) => a.name.toLowerCase().localeCompare(b.name))
	);

	const term = writable('');

	const filteredAbilities = derived([allAbilities, term], ([$allAbilities, $term]) => {
		if ($term === '') {
			return $allAbilities;
		}
		currentPage.set(1);
		return $allAbilities.filter(
			(ability) =>
				ability.name.toLowerCase().includes($term.toLowerCase()) ||
				ability.description.toLowerCase().includes($term.toLowerCase())
		);
	});
	let currentPage = writable(1);
	let totalPages = writable(Math.ceil($filteredAbilities.length / 10));
	$: totalPages.set(Math.ceil($filteredAbilities.length / 10));
	let limit = 10;

	let searchTerm = '';
	$: term.set(searchTerm);
	$: totalPages.set(Math.ceil($filteredAbilities.length / 10));
</script>

<main class="gap-4 flex flex-col sm:px-9 p-3">
	<h1 class="sm:text-9xl text-5xl text-center">Ability Search</h1>
	<label class="input input-bordered flex items-center gap-2 text-xl">
		<input
			required
			name="searchTerm"
			type="text"
			class="grow"
			placeholder="Search Abilities (name, description, status...)"
			bind:value={searchTerm}
		/>
	</label>
	<div class="join">
		{#each Array($totalPages) as _, i}
			<button
				class={'join-item btn btn-md' + (i === $currentPage - 1 ? ' btn-active' : '')}
				on:click={() => {
					currentPage.set(i + 1);
				}}>{i + 1}</button
			>
		{/each}
	</div>
	{#each $filteredAbilities.slice(($currentPage - 1) * limit, $currentPage * limit) as filterResult (filterResult.name)}
		<AbilityCard {filterResult} {term} {statuses} />
	{/each}
</main>
