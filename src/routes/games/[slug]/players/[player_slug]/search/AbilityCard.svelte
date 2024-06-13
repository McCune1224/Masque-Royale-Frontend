<script lang="ts">
	import { writable, type Readable } from 'svelte/store';
	import Highlight from './Highlight.svelte';
	import type { AbilityDetails, AnyAbilityDetails, Role, Status } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import { onMount } from 'svelte';
	import { ApiError } from '$lib/api/api';

	export let filterResult: AnyAbilityDetails | AbilityDetails;
	export let term: Readable<string>;
	export let statuses: Status[];

	export const client = new ApiClient();

	// export let associatedRole = writable<Role>();
	// onMount(async () => {
	// 	try {
	// 		//type cast to AbilityDetails and check if role_id is set
	// 		let potentialAbilityDetails: AbilityDetails = filterResult as AbilityDetails;
	// 		if (potentialAbilityDetails.default_charges !== undefined) {
	// 			associatedRole.set(
	// 				await client.abilityDetailsApi.getRoleByAbilityID(filterResult.id.toString())
	// 			);
	// 		} else {
	// 			console.log('SKIPPING', filterResult.name);
	// 		}
	// 	} catch (e) {
	// 		if (e instanceof ApiError) {
	// 			console.log(e.message);
	// 		}
	// 	}
	// });
</script>

<div class="flex flex-col gap-1 bg-base-300 rounded-md border-2 border-primary p-3">
	<div class="text-xl bold">
		<Highlight text={filterResult.name} term={$term} />
	</div>
	<!-- <p class="prose">{filterResult.description}</p> -->
	<Highlight text={filterResult.description} term={$term} />

	<!-- {#if $associatedRole} -->
	<!-- 	<p>Role: {$associatedRole.name} ({$associatedRole.alignment} {filterResult.name})</p> -->
	<!-- {/if} -->
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
