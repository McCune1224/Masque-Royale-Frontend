<script lang="ts">
	import type { PlayerAbility } from '$lib/api/types';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	export let ability: PlayerAbility;
	let targetAbility = writable(ability);
</script>

<div class="flex flex-row justify-between p-2">
	<div class="flex flex-row gap-2 text-xl">
		<button class="btn btn-sm btn-success">+</button>
		<button class="btn btn-sm btn-error">-</button>
		<button class="btn btn-sm btn-primary">X</button>
	</div>
	<p>{ability.name}</p>
	<span class="font-bold text-xl">{ability.charges}</span>
</div>
