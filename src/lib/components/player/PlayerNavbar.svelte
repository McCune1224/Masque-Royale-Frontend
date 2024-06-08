<script lang="ts">
	import type { Game, Player } from '$lib/api/types';

	export let game_id: string;
	export let player_id: string;

	type NavbarLink = {
		name: string;
		href: string;
	};

	let navbarlinks: NavbarLink[] = [
		{ name: 'Player Home', href: `/games/${game_id}/players/${player_id}` },
		{ name: 'Action Requests', href: `/games/${game_id}/players/${player_id}/requests` },
		{ name: 'Role Card', href: `/games/${game_id}/players/${player_id}` }
	];

	// make a map of the navbar links
	const navbarLinkMap = new Map(navbarlinks.map((link) => [link.name, link]));
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</div>
			<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<!-- <li><a href={navbarlinks[0].href}>{navbarlinks[0].name}</a></li> -->
				<li><a href={navbarlinks[1].href}>{navbarlinks[1].name}</a></li>
				<li><a href={navbarlinks[2].href}>{navbarlinks[2].name}</a></li>
			</ul>
		</div>
		<a href={navbarlinks[0].href} class="btn btn-ghost text-xl">Player Home</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<!-- <li><a href={navbarlinks[0].href}>{navbarlinks[0].name}</a></li> -->
			<li><a href={navbarlinks[1].href}>{navbarlinks[1].name}</a></li>
			<li><a href={navbarlinks[2].href}>{navbarlinks[2].name}</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<a href="/" class="btn btn-ghost">Exit Game</a>
	</div>
</div>
