<script lang="ts">
	import type { Game, Player } from '$lib/api/types';

	export let game_id: string;
	export let player_id: string;

	type NavbarLink = {
		name: string;
		href: string;
	};

	let navbarlinks: NavbarLink[] = [
		{ name: 'Requests', href: `/games/${game_id}/players/${player_id}/requests` },
		{ name: 'Role Card', href: `/games/${game_id}/players/${player_id}` },
		{ name: 'Search', href: `/games/${game_id}/players/${player_id}/search` }
	];

	// make a map of the navbar links
	const navbarLinkMap = new Map(navbarlinks.map((link) => [link.name, link]));
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Exit Game</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#each navbarlinks as link}
				<li><a href={link.href}>{link.name}</a></li>
			{/each}
		</ul>
	</div>
</div>
