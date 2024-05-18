<script lang="ts">
	import { getHealthcheck } from '$lib/api';
	import type { Healthcheck } from '$lib/api';
	let healthyResp: Healthcheck;
	let error: string | null = '';

	async function loadHealthCheck() {
		try {
			healthyResp = await getHealthcheck();
		} catch (err) {
			error = (err as Error).message;
		}
	}
</script>

<main>
	{#if error}
		<p class="error">{error}</p>
	{/if}
	{#if healthyResp}
		<p>{healthyResp.response_time}</p>
	{/if}
	<h1>TODO</h1>

	<div>
		<h2>Health Check</h2>
		<button on:click={loadHealthCheck}>Create</button>
	</div>
</main>
