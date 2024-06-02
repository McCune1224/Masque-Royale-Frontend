<script lang="ts">
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { game } = data;
</script>

<AdminNavbar {game} />

<slot />
