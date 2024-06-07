<script lang="ts">
	import type { Role, Room, Player } from '$lib/api/types';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PlayerCreateSchema } from '$lib/schemas';
	import { type Writable } from 'svelte/store';

	export let data: SuperValidated<Infer<PlayerCreateSchema>>;
	export let roles: Role[];
	export let rooms: Room[];

	const { form, errors, enhance } = superForm(data);
</script>

<div class="bg-neutral p-3 shadow-lg mg-auto">
	<form class="flex flex-col gap-4" action="?/add_player" method="POST">
		<h2 class="text-xl font-bold">Add Player</h2>
		<div class="flex flex-col gap-4">
			{#if $errors.name}<span class="bg-error text-base-content">{$errors.name}</span>{/if}
			Player Name
			<label class="input input-bordered flex items-center gap-2">
				<input
					required
					type="text"
					class="grow"
					name="name"
					placeholder="Name"
					bind:value={$form.name}
				/>
			</label>
		</div>
		<div class="flex flex-col gap-2">
			Select a Role
			<select
				required
				name="role_id"
				bind:value={$form.role_id}
				class="select select-bordered focus:select-secondary w-full"
			>
				{#each roles as role}
					<option selected={$form.role_id === role.id} value={role.id}>{role.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-2">
			Select a Room
			<select
				required
				name="room_id"
				bind:value={$form.room_id}
				class="select select-bordered focus:select-secondary w-full"
			>
				{#each rooms as room}
					<option value={room.id}>{room.name}</option>
				{/each}
			</select>

			<button class="btn btn-accent">Add Player</button>
		</div>
	</form>
</div>
