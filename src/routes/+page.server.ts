import { superValidate, message, fail } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { getGames, gamesCreate, type Game } from '$lib/api/game';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	name: z.string().min(3)
});

export const load = (async () => {
	const form = await superValidate(zod(schema));
	try {
		const gamesResponse = await getGames();
		return { form, games: gamesResponse };
	} catch (err) {
		console.log(err);
		return { form, error: (err as Error).message };
	}

	// Always return { form } in load functions
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const createResponse = await gamesCreate(form.data.name);
			const game = createResponse.data;
			return {
				form,
				game
			};
		} catch (err) {
			if (!form.valid) {
				// Again, return { form } and things will just work.
				return fail(400, { form, error: err });
			}
		}
	}
} satisfies Actions;
