<script lang="ts">
	import GameSheetUpload from '$lib/components/admin/GameSheetUpload.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
	const gameID = data.params.slug;
</script>

<main>
	<h1>Hello from admin {gameID}</h1>

	<GameSheetUpload />
</main>
