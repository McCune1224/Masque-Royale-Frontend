<script lang="ts">
	import { ApiError } from '$lib/api/api';
	import { ApiClient } from '$lib/api/client';
	import type { CompleteRole, Role } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let role_id: string;
	let role = writable<Role>();
	onMount(async () => {
		const client = new ApiClient();
		try {
			role.set(await client.roleApi.getRole(role_id));
		} catch (e) {
			if (e instanceof ApiError) {
				console.log(e.message);
			}
		}
	});
</script>

{#if $role}
	<div class="flex flex-col gap-4 bg-base-300 p-4 rounded-lg">
		<div class="flex flex-col gap-2">
			<p class="text-xl font-bold">{$role.name}</p>
			<p class="text-sm">{$role.alignment}</p>
		</div>
	</div>
{:else}
	<div class="skeleton h-20 w-30"></div>
{/if}
