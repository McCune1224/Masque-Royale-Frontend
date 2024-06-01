<script lang="ts">
	//get pblic key from env
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import type { Writable } from 'svelte/store';
	import { roleSubmitting, anyAbilitySubmitting } from './stores';
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';

	function formPost(url: string, state: Writable<boolean>) {
		return async (event) => {
			state.set(true);
			event.preventDefault();

			const form = event.target;
			const formData = new FormData(form);

			try {
				const response = await fetch(PUBLIC_BACKEND_URL + url, {
					method: 'POST',
					body: formData
				});
				console.log(response);
				const result = await response.json();
				console.log(result);
				state.set(false);
			} catch (error) {
				console.log(error);
				state.set(false);
			}
			state.set(false);
		};
	}

	const handleRoleSubmit = formPost('/api/games/1/admin/sync-roles-csv', roleSubmitting);
	const handleAnyAbilitySubmit = formPost(
		'/api/games/1/admin/sync-any-abilities-csv',
		anyAbilitySubmitting
	);
</script>

<div class="flex flex-col justify-center gap-4">
	<form class="flex flex-row gap-4 p-4" on:submit={handleRoleSubmit} enctype="multipart/form-data">
		<p class="text-xl font-bold">Upload Roles CSV</p>
		<label>
			<input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" />
		</label>
		{#if $roleSubmitting}
			<button class="btn btn-disabled" disabled
				>Updating Roles<span class="loading loading-ring loading-md"></span></button
			>
		{:else}
			<button class="btn btn-accent" type="submit">Submit </button>
		{/if}
	</form>

	<!-- <form -->
	<!-- 	class="flex flex-row gap-4 p-4" -->
	<!-- 	on:submit={handleAnyAbilitySubmit} -->
	<!-- 	enctype="multipart/form-data" -->
	<!-- > -->
	<!-- 	<p class="text-xl font-bold">Upload Any Abilities CSV</p> -->
	<!-- 	<label> -->
	<!-- 		<input type="file" name="file" class="file-input file-input-bordered w-full max-w-xs" /> -->
	<!-- 	</label> -->
	<!-- 	{#if $anyAbilitySubmitting} -->
	<!-- 		<button class="btn btn-disabled" disabled -->
	<!-- 			>Updating Roles<span class="loading loading-ring loading-md"></span></button -->
	<!-- 		> -->
	<!-- 	{:else} -->
	<!-- 		<button class="btn btn-accent" type="submit">Submit </button> -->
	<!-- 	{/if} -->
	<!-- </form> -->
</div>
