<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { ApiClient } from '$lib/api/client';
	import type { Player } from '$lib/api/types';
	export let player: Player;

	let loading = false;
	async function handleToggleAlive() {
		const client = new ApiClient();
		loading = true;
		player.alive = !player.alive;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loading = false;
			console.log(response);
		} catch (error) {
			console.log(error);
			loading = false;
		}
	}
</script>

<div>
	<div class="flex flex-col gap-2">
		<div class="flex items-center gap-2">
			<div class="flex-1">
				<div class="text-xl font-bold">{player.name}</div>
				<div class="text-sm">{player.role_id}</div>
			</div>
		</div>
		<div class="text-sm text-gray-500">{player.notes}</div>
		<button class="btn btn-accent" on:click={handleToggleAlive}>
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
			{#if !player.alive}
				Mark Alive
			{:else}
				Mark Dead
			{/if}
		</button>
	</div>
</div>
