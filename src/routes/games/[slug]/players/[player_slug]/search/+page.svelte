<script lang="ts">
	import type { AbilityDetails, AnyAbilityDetails, Status, Role } from '$lib/api/types';
	import { derived, writable } from 'svelte/store';
	import type { PageLoad } from './$types';
	import { ApiClient } from '$lib/api/client';
	import Highlight from './Highlight.svelte';
	import { onMount } from 'svelte';
	import AbilityCard from './AbilityCard.svelte';

	export let data: PageLoad;
	const client = new ApiClient();

	let abilityMap = writable<Map<number, Role>>();

	const statuses: Status[] = data.statuses;

	//WARNING: Imagine a world where sveltekit exports $types correcetly. allAbilities does in fact exist...
	const dataAbilities: (AnyAbilityDetails | AbilityDetails)[] = data.allAbilities;
	const allAbilities = writable(
		dataAbilities.sort((a, b) => a.name.toLowerCase().localeCompare(b.name))
	);
	const term = writable('');
	const filteredAbilities = derived([allAbilities, term], ([$allAbilities, $term]) => {
		if ($term === '') {
			return $allAbilities;
		}
		return $allAbilities.filter(
			(ability) =>
				ability.name.toLowerCase().includes($term.toLowerCase()) ||
				ability.description.toLowerCase().includes($term.toLowerCase())
		);
	});

	let searchTerm = '';
	$: term.set(searchTerm);
</script>

<main class="gap-4 flex flex-col sm:px-9 p-3">
	<h1 class="sm:text-9xl text-5xl text-center p-9">Ability Search</h1>
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
	{#each $filteredAbilities as filterResult}
		<AbilityCard {filterResult} {term} {statuses} />
	{/each}
</main>
