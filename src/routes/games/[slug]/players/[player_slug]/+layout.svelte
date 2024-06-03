<script lang="ts">
	import AdminNavbar from '$lib/components/admin/AdminNavbar.svelte';
	import PlayerNavbar from '$lib/components/player/PlayerNavbar.svelte';
	import { page } from '$app/stores';

	console.log($page.params);
</script>

<PlayerNavbar game_id={$page.params.slug} player_id={$page.params.player_slug} />

<slot />
