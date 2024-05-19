<script lang="ts">
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const errorStore = getToastStore();
	if (data.error) {
		console.log(data.error);
		errorStore.trigger({
			message: 'Invalid Game ID ' + data.gameId,
			background: 'variant-filled-error'
		});
	}
</script>

<section class="container h-full mx-auto flex flex-col gap-4 px-4 sm:px-0">
	{#if data.error}
		<a class="btn btn-md variant-filled-surface" href="/">Return to Home Page</a>
	{/if}

	{#if data.game}
		<h1 class="h1">Hello from {data.game.Id}</h1>
	{/if}
</section>
