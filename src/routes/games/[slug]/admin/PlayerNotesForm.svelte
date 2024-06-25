<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Player } from '$lib/api/types';
	import { writable, type Writable } from 'svelte/store';

	export let playerNotes: Writable<{ player_id: number; note: string }>;
	export let gamePlayerStore: Writable<Player[]>;
	export let player: Writable<Player>;
	export let game_id: string;
	let loadingAddNotes = false;

	async function handleAddNotes() {
		const client = new ApiClient();
		loadingAddNotes = true;
		loadingAddNotes = true;
		try {
			const response = await client.playerApi.updatePlayerNotes(
				game_id,
				$player.id.toString(),
				$playerNotes.note
			);
			console.log(response);
			loadingAddNotes = false;
		} catch (error) {
			console.log(error);
			loadingAddNotes = false;
		}
	}
</script>

{#if $playerNotes}
	<textarea class="textarea textarea-primary textarea-lg" bind:value={$playerNotes.note} />
	<button class="btn btn-sm btn-primary" on:click={handleAddNotes}> Save Notes</button>
{/if}
