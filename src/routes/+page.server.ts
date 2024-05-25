import { message } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { ApiClient } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import type { Game } from '$lib/api/types';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(4)
});

export const load: PageServerLoad = async ({}) => {
	const client = new ApiClient();
	let games: Game[];

	const form = await superValidate(zod(schema));
	try {
		games = await client.userApi.getAllGames();
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
			client.userApi.createGame({ name: form.data.name });
			return message(form, 'Form posted successfully!');
		} catch (err) {
			console.log(err);
			return fail(500, { form });
		}
	}
} satisfies Actions;
