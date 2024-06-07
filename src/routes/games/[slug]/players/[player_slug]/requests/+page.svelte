<script lang="ts">
	import { anyAbilityDetailsApi } from '$lib/api/any_ability_details';
	import type { AnyAbilityDetails } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import PlayerRequestForm from '$lib/components/player/PlayerRequestForm.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';

	let loading = writable(true);
	let actionOptions: AnyAbilityDetails[];
	export let data: PageData;

	const apiClient = new ApiClient();
	onMount(async () => {
		actionOptions = (await apiClient.anyAbilityDetailsApi.getAllAnyAbilities()).sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		loading.set(false);
	});
</script>

<div class="container mx-auto">
	<h1 class="sm:text-9xl text-5xl text-center p-9">Action Requests</h1>
	{#if !$loading}
		<PlayerRequestForm {actionOptions} game={data.game} player={data.player} />
	{:else}
		<div class="flex flex-col gap-4 w-52 mx-auto">
			<div class="skeleton h-4"></div>
			<div class="skeleton h-4 w-full"></div>
			<div class="skeleton h-4 w-full"></div>
		</div>
	{/if}
</div>
