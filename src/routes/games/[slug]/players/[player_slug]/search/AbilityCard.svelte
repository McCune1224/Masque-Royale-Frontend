<script lang="ts">
	import { writable, type Readable } from 'svelte/store';
	import Highlight from './Highlight.svelte';
	import type { AbilityDetails, AnyAbilityDetails, Role, Status } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import { onMount } from 'svelte';
	import { ApiError } from '$lib/api/api';
	import RoleCard from '$lib/components/role/RoleCard.svelte';

	export let filterResult: AbilityDetails;
	export let term: Readable<string>;
	export let statuses: Status[];

	export const client = new ApiClient();

	export let associatedRole = writable<Role>();
	let searching = writable<boolean>(true);
	onMount(async () => {
		try {
			//type cast to AbilityDetails and check if role_id is set
			associatedRole.set(
				await client.abilityDetailsApi.getRoleByAbilityID(filterResult.id.toString())
			);
		} catch (e) {
			if (e instanceof ApiError) {
				// check if non 400 error
				if (e.status !== 400 && e.status !== 404) {
					console.log(e.status, e.message);
				}
			}
		} finally {
			searching.set(false);
		}
	});
</script>

<div class="flex flex-col gap-2 bg-base-300 rounded-md border-2 border-primary p-3">
	<div class="text-xl bold">
		<Highlight text={filterResult.name} term={$term} />
	</div>
	<!-- <p class="prose">{filterResult.description}</p> -->
	<Highlight text={filterResult.description} term={$term} />

	{#if $associatedRole}
		<div class="indicator">
			<span class="indicator-item badge badge-info">?</span>
			<button
				class="btn btn-sm btn-primary"
				onclick={`my_modal_${$associatedRole.id}_${filterResult.id}.showModal()`}
				>Role: {$associatedRole.name}</button
			>
		</div>
		<dialog
			id={`my_modal_${$associatedRole.id}_${filterResult.id}`}
			class="modal modal-bottom sm:modal-middle"
		>
			<div class="modal-box">
				<RoleCard role={$associatedRole} />
				<div class="modal-action">
					<form method="dialog">
						<!-- if there is a button in form, it will close the modal -->
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	{:else if $searching}
		<div class="indicator">
			<span class="indicator-item badge badge-primary"></span>
			<button class="btn btn-sm" disabled>
				<span class="loading loading-spinner text-primary"></span>
				finding role...
			</button>
		</div>
	{/if}

	<div class="p-2 flex flex-row gap-5">
		{#each statuses as status}
			{#if filterResult.description.toLowerCase().includes(status.name.toLowerCase())}
				<!-- Open the modal using ID.showModal() method -->
				<div class="indicator">
					<span class="indicator-item badge badge-info">?</span>
					<button class="btn btn-xs btn-secondary" onclick={`my_modal_${status.id}.showModal()`}
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
