<script lang="ts">
	import type { Role, Room, Player } from '$lib/api/types';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import type { PlayerCreateSchema } from '$lib/schemas';

	export let data: SuperValidated<Infer<PlayerCreateSchema>>;
	export let roles: Role[];
	export let rooms: Room[];

	const { form, errors, enhance } = superForm(data);
</script>

<div class="flex flex-col gap-4">
	<form action="?/add_player" method="POST" use:enhance>
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
		Select a Role
		<select
			required
			name="role_id"
			bind:value={$form.role_id}
			class="select select-bordered w-full max-w-xs"
		>
			{#each roles as role}
				<option selected={$form.role_id === role.id} value={role.id}>{role.name}</option>
			{/each}
		</select>

		Select a Room
		<select
			required
			name="room_id"
			bind:value={$form.room_id}
			class="select select-bordered w-full max-w-xs"
		>
			{#each rooms as room}
				<option value={room.id}>{room.name}</option>
			{/each}
		</select>

		<button class="btn btn-accent">Add Player</button>
	</form>
</div>
