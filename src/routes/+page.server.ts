import { message, setError } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { ApiClient } from '$lib/api/client';
import type { Game } from '$lib/api/types';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { ApiError } from '$lib/api/api';

const schema = z.object({
	name: z.string().min(4)
});

export const load: PageServerLoad = async ({}) => {
	const client = new ApiClient();
	let games: Game[];

	const form = await superValidate(zod(schema));
	try {
		games = await client.gameApi.getAllGames();
		return {
			form,
			games
		};
	} catch (err) {
		console.log(err);
		return {
			form
		};
	}
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data
		const client = new ApiClient();
		try {
			const newGame = await client.gameApi.createGame({ name: form.data.name });
			return message(form, `Game ${newGame.name} Created!`);
		} catch (err) {
			if (err instanceof ApiError) {
				console.log(err, 'returning fail now...');
				return setError(form, 'name', 'Name Already Exists');
			}
		}
	}
} satisfies Actions;
