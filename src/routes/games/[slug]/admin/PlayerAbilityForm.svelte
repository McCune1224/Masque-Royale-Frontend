<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { PlayerAbility } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	export let ability: PlayerAbility;
	export let game_id: string;
	export let player_id: string;
	let targetAbility = writable(ability);

	const updatingCharge = writable(false);
	async function updateAbilityCharge(newCharge: number) {
		updatingCharge.set(true);
		const client = new ApiClient();
		try {
			await client.playerApi.updatePlayerAbility(
				game_id,
				player_id,
				ability.ability_details_id.toString(),
				newCharge
			);
			targetAbility.update((ability) => {
				ability.charges = newCharge;
				return ability;
			});
		} catch (error) {
			console.log(error);
		} finally {
			updatingCharge.set(false);
		}
	}
</script>

<div class="flex flex-row justify-between items-center p-2 text-center">
	<span class="font-bold text-xl">{$targetAbility.charges}</span>
	<p class="text-xl">{$targetAbility.name}</p>
	<div class="flex flex-row gap-2 text-xl">
		<button
			class="btn btn-md btn-success"
			on:click={() => {
				updateAbilityCharge($targetAbility.charges + 1);
			}}>+</button
		>
		<button
			class="btn btn-md btn-error"
			on:click={() => {
				updateAbilityCharge(Math.max($targetAbility.charges - 1, 0));
			}}>-</button
		>
	</div>
</div>
