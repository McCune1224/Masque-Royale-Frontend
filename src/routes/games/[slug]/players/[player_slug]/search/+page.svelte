<script lang="ts">
	import type { AbilityDetails, AnyAbilityDetails } from '$lib/api/types';
	import { derived, writable } from 'svelte/store';
	import type { PageLoad } from './$types';

	export let data: PageLoad;

	const { statuses } = data;

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

<main class="prose p-4">
	<h1 class="text-center p-9">Ability Search</h1>
	<label class="input input-bordered flex items-center gap-2 text-xl">
		<input
			required
			name="searchTerm"
			type="text"
			class="grow"
			placeholder="Search Abilities"
			bind:value={searchTerm}
		/>
	</label>
	{#each $filteredAbilities as filterResult}
		<div class="flex flex-col gap-1 bg-base-300 border-2 border-accent">
			<p>{filterResult.name}</p>
			<p>{filterResult.description}</p>
			<div class="p-2 flex flex-row gap-2">
				{#each statuses as status}
					{#if filterResult.description.toLowerCase().includes(status.name.toLowerCase())}
						<div class="indicator">
							<span class="indicator-item badge badge-base">?</span>
							<button class="btn btn-accent">{status.name}</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</main>
