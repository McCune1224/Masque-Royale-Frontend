<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Player } from '$lib/api/types';
	import type { Writable } from 'svelte/store';

	export let player: Writable<Player>;
	export let playerStore: Writable<Player[]>;

	let loadingAliveToggle = false;
	async function handleToggleAlive() {
		loadingAliveToggle = true;
		try {
			const client = new ApiClient();
			$player.alive = !$player.alive;
			const response = await client.playerApi.updatePlayer($player);
			loadingAliveToggle = false;
			playerStore.update((players) => {
				players.filter((player) => player.id !== player.id);
				return players;
			});
		} catch (error) {
			console.log(error);
			loadingAliveToggle = false;
		}
	}
</script>

<button
	class={`btn btn-sm ${!$player.alive ? '' : 'btn-primary'} ${loadingAliveToggle ? 'btn-disabled' : ''}`}
	on:click={handleToggleAlive}
>
	{#if loadingAliveToggle}
		<span class="loading loading-spinner"></span>
	{/if}
	{#if !$player.alive}
		Mark Alive
	{:else}
		Mark Dead
	{/if}
</button>
