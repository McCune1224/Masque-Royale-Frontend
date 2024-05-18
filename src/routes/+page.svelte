<script lang="ts">
	import { getHealthcheck, handleApiCall } from '$lib/api';
	import type { Healthcheck } from '$lib/api';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	let healthyResp: Healthcheck | null;
	let error: string | null;
	let errToast: ToastSettings = {
		message: 'This message will auto-hide after 5 seconds.',
		timeout: 5000
	};

	const toastStore = getToastStore();

	async function GetHealthCheck() {
		const { response, error: err } = await handleApiCall(getHealthcheck);
		healthyResp = response;
		error = err;
		error = 'test';
		if (error != null) {
			toastStore.trigger({
				message: error,
				timeout: 5000,
				background: 'variant-filled-error'
			});
		}
	}
</script>

<main>
	{#if healthyResp}
		<p>{healthyResp.response_time}</p>
	{/if}
	<h1>TODO</h1>

	<div>
		<h2>Health Check</h2>
		<button on:click={GetHealthCheck}>Create</button>
	</div>
</main>
