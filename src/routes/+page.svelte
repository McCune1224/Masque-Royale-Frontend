<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Game } from '$lib/api/types';
	import { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { games } = data;

	let gameCreateSending = false;
	const client = new ApiClient();
	const { form, enhance, errors, message, delayed } = superForm(data.form);
</script>

<main class="gap-4 flex flex-col">
	<h1 class="text-5xl text-center">Masque Royale</h1>
	<form class="flex flex-col p-4 bg-base-300" method="POST" use:enhance>
		{#if $message}
			<h3>{$message}</h3>
		{/if}
		<h3 class="text-center text-3xl">Create Game</h3>
		<label class="input input-bordered flex items-center gap-2 text-xl">
			Name:
			<input name="name" type="text" class="grow" placeholder="Daisy" bind:value={$form.name} />
		</label>
		{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
		{#if $delayed}
			<button class="btn">
				<span class="loading loading-spinner"></span>
				Sending...
			</button>
		{:else}
			<button class="btn btn-accent">Submit Game</button>
		{/if}
	</form>

	<div class="">
		<!-- {#if err} -->
		<!-- 	<p>{err}</p> -->
		<!-- {/if} -->
		{#if games}
			<div class="flex flex-col gap-8 p-4">
				{#each games.sort((a, b) => a.name.localeCompare(b.name)) as game}
					<div class="stats shadow">
						<div class="stat text-center border-2 shadow-2xl">
							<div class="text-xl">{game.name}</div>
							<h2 class="stat-title">Players: {game.player_ids?.length || 0}</h2>
							<div class="gap-2">
								<a href={`/games/${game.id}/join`} class="btn btn-accent">Player Join</a>
								<a href={`/games/${game.id}/join`} class="btn btn-accent">Admin Join</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
