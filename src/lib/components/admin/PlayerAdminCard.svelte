<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { ApiClient } from '$lib/api/client';
	import type { Player } from '$lib/api/types';
	import { type Writable } from 'svelte/store';

	export let player: Player;
	export let playerStore: Writable<Player[]>;

	let loadingAliveToggle = false;
	let loadingDeletePlayer = false;
	async function handleToggleAlive() {
		const client = new ApiClient();
		loadingAliveToggle = true;
		player.alive = !player.alive;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loadingAliveToggle = false;
			console.log(response);
		} catch (error) {
			console.log(error);
			loadingAliveToggle = false;
		}
	}

	async function handleDeletePlayer() {
		const client = new ApiClient();
		loadingDeletePlayer = true;
		try {
			const response = await client.playerApi.deletePlayer(player);
			playerStore.update((cp: Player[]) => {
				// I don't know why, but this is deleting the item infront of it
				return cp.filter((p: Player) => p.id !== player.id);
			});
			loadingDeletePlayer = false;
			console.log(response);
		} catch (error) {
			console.log(error);
			loadingDeletePlayer = false;
		}
	}

	let loadingAddNotes = false;
	async function handleAddNotes() {
		loadingAddNotes = true;
		const client = new ApiClient();
		loadingAddNotes = true;
		try {
			const response = await client.playerApi.updatePlayer(player);
			loadingAddNotes = false;
			console.log(response);
		} catch (error) {
			console.log(error);
			loadingAddNotes = false;
		}
	}
</script>

<div
	class={'bg-neutral p-8 ' + (player.alive ? '' : 'border-2 border-dashed border-white opacity-50')}
>
	<div class="flex items-center gap-2">
		<div class="text-2xl font-bold">{player.name}</div>
	</div>
	<div class="">
		<!-- You can open the modal using ID.showModal() method -->
		<div class="flex flex-col gap-2">
			<p>Player Notes</p>
			<textarea class="textarea textarea-accent textarea-lg" bind:value={player.notes} />
			<button
				class={`btn ${loadingAddNotes ? 'btn-disabled' : 'btn-accent'}`}
				on:click={handleAddNotes}
			>
				{#if loadingAddNotes}
					<span class="loading loading-spinner w-25"></span>
				{/if}
				Save Notes</button
			>
			<button
				class={`btn ${!player.alive ? '' : 'btn-accent'} ${loadingAliveToggle ? 'btn-disabled' : ''}`}
				on:click={handleToggleAlive}
			>
				{#if loadingAliveToggle}
					<span class="loading loading-spinner"></span>
				{/if}
				{#if !player.alive}
					Mark Alive
				{:else}
					Mark Dead
				{/if}
			</button>
			<!-- Open the modal using ID.showModal() method -->
			<button class="btn btn-accent" onclick="my_modal_5.showModal()">Delete Player</button>
			<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
				<div class="modal-box">
					<h3 class="font-bold text-lg">CAUTION: Deleting a player is not revertable</h3>
					<p class="py-4">Only Delete if you're CERTAIN this play will not be playing anymore.</p>
					<div class="modal-action">
						<form method="dialog">
							<!-- if there is a button in form, it will close the modal -->
							<div class="flex gap-8">
								<button class="btn btn-error" on:click={handleDeletePlayer}>Delte Player</button>
								<button class="btn btn-accent">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	</div>
</div>
