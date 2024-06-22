<script lang="ts">
	import { ApiClient } from '$lib/api/client';
	import type { Game } from '$lib/api/types';
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	const { games } = data;

	const client = new ApiClient();
	const { form, errors, message, delayed } = superForm(data.form);
</script>

<main class="gap-4 flex flex-col">
	<h1 class="sm:text-9xl text-5xl text-center p-9">Masque Royale</h1>
	<form class="flex flex-col p-4 bg-base-300" method="POST">
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
		{/if}
		<button class="btn btn-primary">Submit Game</button>
	</form>

	<div class="">
		{#if games}
			<div class="flex flex-col gap-8 p-4">
				{#each games.sort((a, b) => a.name.localeCompare(b.name)) as game}
					<div class="stats shadow">
						<div class="stat text-center border-2 shadow-2xl">
							<div class="text-3xl">{game.name}</div>
							<div class="gap-2">
								<a href={`/games/${game.id}/join`} class="btn btn-primary">Player Join</a>
								<a href={`/games/${game.id}/admin`} class="btn btn-primary">Admin Join</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
