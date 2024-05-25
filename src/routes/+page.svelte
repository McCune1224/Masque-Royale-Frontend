<script lang="ts">
	import { enhance } from '$app/forms';
	import { ApiClient } from '$lib/api/client';
	import type { Game } from '$lib/api/types';
	import { superForm } from 'sveltekit-superforms';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { games, err } = data;

	const client = new ApiClient();
	const { form, errors, message } = superForm(data.form);
</script>

<form class="flex flex-col" method="POST">
	{#if $message}
		<h3>{$message}</h3>
	{/if}
	<h3 class="">Create Game</h3>
	<label class="input input-bordered flex items-center gap-2">
		Name:
		<input name="name" type="text" class="grow" placeholder="Daisy" bind:value={$form.name} />
	</label>
	{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
	<button class="btn btn-accent btn-outline">Epic</button>
</form>

<article class="prose">
	{#if err}
		<p>{err}</p>
	{/if}
	{#if games}
		{#each games.sort((a, b) => a.name.localeCompare(b.name)) as game}
			<p>{game.name}</p>
		{/each}
	{/if}
</article>
