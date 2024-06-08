<script lang="ts">
	import type { Game } from '$lib/api/types';

	export let game: Game;

	type NavbarLink = {
		name: string;
		href: string;
	};

	let navbarlinks: NavbarLink[] = [
		{ name: 'Admin Home', href: `/games/${game.id}/admin` },
		{ name: 'Action Queue', href: `/games/${game.id}/admin/queue` }
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
