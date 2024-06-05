<script lang="ts">
	import { anyAbilityDetailsApi } from '$lib/api/any_ability_details';
	import type { AnyAbilityDetails } from '$lib/api/types';
	import { ApiClient } from '$lib/api/client';
	import PlayerRequestForm from '$lib/components/player/PlayerRequestForm.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let loading = writable(true);
	let actionOptions: AnyAbilityDetails[];
	const apiClient = new ApiClient();
	onMount(async () => {
		actionOptions = await apiClient.anyAbilityDetailsApi.getAllAnyAbilities();
		loading.set(false);
		console.log(actionOptions);
	});
</script>

<div class="container mx-auto">
	<h1 class="sm:text-9xl text-5xl text-center p-9">Action Requests</h1>
	{#if !$loading}
		<PlayerRequestForm {actionOptions} />
	{:else}
		<div class="flex flex-col gap-8 skeleton w-40 h-20"></div>
	{/if}
</div>
