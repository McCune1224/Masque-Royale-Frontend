<script lang="ts">
	import { anyAbilityDetailsApi } from '$lib/api/any_ability_details';
	import type { Action, AnyAbilityDetails } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import PlayerRequestForm from '$lib/components/player/PlayerRequestForm.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';

	let loading = writable(true);
	let actionOptions: AnyAbilityDetails[];
	export let data: PageData;
	const { actions } = data;

	let actionStore = writable<Action[]>([]);
	if (actions != null) {
		actionStore.set(actions);
	}

	const apiClient = new ApiClient();
	onMount(async () => {
		actionOptions = (await apiClient.anyAbilityDetailsApi.getAllAnyAbilities()).sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		loading.set(false);
	});
</script>

<main class="container mx-auto">
	<h1 class="sm:text-9xl text-5xl text-center p-9">Action Requests</h1>
	{#if !$loading}
		<PlayerRequestForm {actionOptions} {actionStore} game={data.game} player={data.player} />
	{:else}
		<div class="flex flex-col gap-4 w-52 mx-auto">
			<div class="skeleton h-4"></div>
			<div class="skeleton h-4 w-full"></div>
			<div class="skeleton h-4 w-full"></div>
		</div>
	{/if}

	<div class="p-9 text-center">
		<h2 class="sm:text-6xl text-3xl">Action History</h2>
		<p class="text-xs">( If you want a request canceled / deleted, inform host. )</p>
	</div>
	{#if $actionStore}
		<div class="flex flex-col prose mx-auto p-4 bg-base-300 rounded-md">
			{#each $actionStore as action}
				<div class="flex flex-col gap-3 p-1">
					<p class="text-xl font-bold">{action.ability_name}</p>
					{#if actionOptions}
						<p>
							Description: {actionOptions.find((a) => a.name === action.ability_name).description}
						</p>
					{/if}
					<p>Targeted: {action.target}</p>
					<p>Context: {action.context}</p>
				</div>
				<div class="divider">--</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col gap-4 mx-auto text-center">
			<p class="text-xl font-bold">Nothing to see here officer...</p>
		</div>
	{/if}
</main>
