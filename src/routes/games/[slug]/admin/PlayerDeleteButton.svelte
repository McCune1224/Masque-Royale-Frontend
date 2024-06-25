<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Player } from '$lib/api/types';
	import type { Writable } from 'svelte/store';

	let loadingDeletePlayer = false;

	export let playerStore: Writable<Player[]>;
	export let player: Writable<Player>;
	async function handleDeletePlayer() {
		const client = new ApiClient();
		loadingDeletePlayer = true;
		try {
			const response = await client.playerApi.deletePlayer($player);
			playerStore.update((cp: Player[]) => {
				return cp.filter((p: Player) => p.id !== $player.id);
			});
			loadingDeletePlayer = false;
		} catch (error) {
			console.log(error);
			loadingDeletePlayer = false;
		}
	}
</script>

<div class="flex justify-start">
	<button class="btn btn-xs btn-error" onclick={`player_${$player.id}.showModal()`}
		>Delete Player</button
	>
	<dialog id={`player_${$player.id}`} class="modal modal-middle sm:modal-middle">
		<div class="modal-box">
			<h3 class="font-bold text-lg">CAUTION: Deleting a player is not revertable</h3>
			<p class="py-4">Only hit Delete if you're CERTAIN this player will not be playing anymore.</p>
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<div class="flex gap-8">
						<button class="btn btn-error" on:click={handleDeletePlayer}>Delete Player</button>
						<button class="btn btn-primary">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	</dialog>
</div>
