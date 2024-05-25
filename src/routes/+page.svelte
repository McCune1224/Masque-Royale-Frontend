<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { games, err } = data;
</script>

<button class="btn btn-accent btn-outline">Epic</button>

<article class="prose">
	{#if err}
		<p>{err}</p>
	{/if}
	{#if games}
		{#each games as game}
			<p>{game.name}</p>
			<p>{game.created_at}</p>
			<p>{game.updated_at}</p>
		{/each}
	{/if}
</article>
