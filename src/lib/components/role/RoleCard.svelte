<script lang="ts">
	import { ApiError } from '$lib/api/api';
	import { ApiClient } from '$lib/api/client';
	import type { AbilityDetails, PassiveDetails, Role } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let role: Role;
	let abilities = writable<AbilityDetails[]>();
	let passives = writable<PassiveDetails[]>();
	onMount(async () => {
		const client = new ApiClient();
		try {
			Promise.all([
				client.roleApi.getRoleAbilities(role.id.toString()),
				client.roleApi.getRolePassives(role.id.toString())
			]).then(([abilitiesResp, passivesResp]) => {
				abilities.set(abilitiesResp);
				passives.set(passivesResp);
				console.log(abilitiesResp);
			});
		} catch (e) {
			if (e instanceof ApiError) {
				console.log(e.status, e.message);
			} else {
				console.log(e);
			}
		}
	});

	function alignmentTailwindColor(alignment: string) {
		if (alignment === 'OUTLANDER') {
			return 'text-warning';
		}
		if (alignment === 'LAWFUL') {
			return 'text-success';
		}
		if (alignment === 'CHAOTIC') {
			return 'text-error';
		}
	}
</script>

<div class="flex flex-col gap-4 bg-base-300 p-4 rounded-lg">
	<div class="flex flex-col gap-2">
		<h1 class="text-xl font-bold">
			{role.name}
			<p class={'text-sm italic ' + alignmentTailwindColor(role.alignment)}>{role.alignment}</p>
		</h1>
	</div>
	<div class="flex flex-col">
		<h2 class="font-semibold text-xl">Abilities</h2>
		{#if $abilities}
			{#each $abilities as ability}
				<div class="flex gap-1 flex-col p-4">
					<h2 class="italic underline underline-offset-4">{ability.name}</h2>
					<p class="prose">{ability.description}</p>
				</div>
			{/each}
		{/if}
		<h2 class="font-semibold text-xl">Passives</h2>
		{#if $passives}
			{#each $passives as passive}
				<div class="flex gap-1 flex-col p-4">
					<h2 class="italic underline underline-offset-4">{passive.name}</h2>
					<p class="prose">{passive.description}</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
