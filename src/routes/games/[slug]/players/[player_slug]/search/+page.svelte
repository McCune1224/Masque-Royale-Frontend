<script lang="ts">
	import type { AbilityDetails, AnyAbilityDetails, Status, Role } from '$lib/api/types';
	import { derived, writable } from 'svelte/store';
	import type { PageLoad } from './$types';
	import { ApiClient } from '$lib/api/client';
	import Highlight from './Highlight.svelte';
	import { onMount } from 'svelte';

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
		<div class="flex flex-col gap-1 bg-base-300 rounded-md border-2 border-primary p-3">
			<div class="text-xl bold">
				<Highlight text={filterResult.name} term={$term} />
			</div>
			<!-- <p class="prose">{filterResult.description}</p> -->
			<Highlight text={filterResult.description} term={$term} />
			<div class="p-2 flex flex-row gap-5">
				{#each statuses as status}
					{#if filterResult.description.toLowerCase().includes(status.name.toLowerCase())}
						<!-- Open the modal using ID.showModal() method -->
						<div class="indicator">
							<span class="indicator-item badge badge-primary">?</span>
							<button class="btn btn-sm btn-accent" onclick={`my_modal_${status.id}.showModal()`}
								>{status.name}</button
							>
						</div>
						<dialog id={`my_modal_${status.id}`} class="modal modal-bottom sm:modal-middle">
							<div class="modal-box">
								<h3 class="font-bold text-lg">{status.name}</h3>
								<p class="py-4">{status.description}</p>
								<div class="modal-action">
									<form method="dialog">
										<!-- if there is a button in form, it will close the modal -->
										<button class="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
</main>
