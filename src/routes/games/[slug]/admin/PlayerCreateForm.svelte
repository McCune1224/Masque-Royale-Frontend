<script lang="ts">
	import { ApiError } from '$lib/api/api';
	import { ApiClient } from '$lib/api/client';
	import type { Player, Role, Room } from '$lib/api/types';
	import { writable, type Writable } from 'svelte/store';

	export let playerStore: Writable<Player[]>;
	export let roles: Role[];
	export let game_id: string;
	export let rooms: Room[];

	const nameError = writable<string>();
	async function handleSubmit(event: SubmitEvent) {
		const client = new ApiClient();

		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get('name') as string;
		const roleId = formData.get('role_id') as string;
		const roomId = formData.get('room_id') as string;

		if (name === '') {
			nameError.set('Name is required');
			return;
		}

		const payload = {
			name: name,
			role_id: +roleId,
			room_id: +roomId
		};

		try {
			const response = await client.playerApi.createPlayer(game_id, payload);
			console.log(response);
			nameError.set('');
			playerStore.update((players) => [...players, response]);
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 400) {
					nameError.set(error.message);
				}
			} else {
				console.log(error);
			}
		} finally {
			event.target.reset();
		}
	}
</script>

<div class="bg-neutral p-3 shadow-lg mg-auto">
	<form
		class="flex flex-col gap-4 bg-neutral p-3 shadow-lg mg-auto"
		method="POST"
		on:submit={handleSubmit}
	>
		<h2 class="text-xl font-bold">Add Player</h2>
		<div class="flex flex-col gap-4">
			Player Name
			{#if $nameError && $nameError !== ''}
				<p class="text-red-500">{$nameError}</p>
			{/if}
			<label class="input input-bordered flex items-center gap-2">
				<input required type="text" class="grow" name="name" placeholder="Name" />
			</label>
		</div>
		<div class="flex flex-col gap-2">
			Select a Role
			<select required name="role_id" class="select select-bordered focus:select-secondary w-full">
				{#each roles as role}
					<option value={role.id}>{role.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex flex-col gap-2">
			Select a Room
			<select required name="room_id" class="select select-bordered focus:select-secondary w-full">
				{#each rooms as room}
					<option value={room.id}>{room.name}</option>
				{/each}
			</select>

			<button class="btn btn-accent">Add Player</button>
		</div>
	</form>
</div>
