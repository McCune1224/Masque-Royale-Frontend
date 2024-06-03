// NOTE: Import fail from Superforms, not from @sveltejs/kit!
import type { Actions } from '@sveltejs/kit';
import { superValidate, fail, message, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { ApiClient } from '$lib/api/client';
import { playerCreateSchema } from '$lib/schemas';
import type { Player } from '$lib/api/types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiError } from '$lib/api/api';

export const load: PageServerLoad = async ({ params }) => {
	const client = new ApiClient();
	const playerCreateForm = await superValidate(zod(playerCreateSchema));

	try {
		const roles = await client.roleApi.getAllRoles();
		const rooms = await client.roomApi.getAllRooms();
		const players = await client.playerApi.getAllPlayersForGame(params.slug);
		return {
			roles,
			rooms,
			players,
			playerCreateForm
		};
	} catch (error) {
		console.log(error);
		return {
			playerCreateForm
		};
	}
};

export const actions = {
	add_player: async ({ request, params }) => {
		const form = await superValidate(request, zod(playerCreateSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const game_id = params.slug;

		const payload = {
			name: form.data.name,
			role_id: form.data.role_id,
			room_id: form.data.room_id
		};


		const client = new ApiClient();
		try {
			const response = await client.playerApi.createPlayer(game_id, payload);
			return message(form, `Player ${form.data.name} Added!`);
		} catch (er) {
			if (er instanceof ApiError) {
				console.log(er, 'returning fail now...');
				return setError(form, 'name', 'Name Already Exists');
			} else {
				console.log(er);
				return setError(form, 'name', 'Something went wrong');
			}
		}
	}
} satisfies Actions;
