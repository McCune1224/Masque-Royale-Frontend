import { z } from 'zod';
import type { PageServerLoad } from './$types';
import { getGames, gamesCreate, type Game } from '$lib/api/game';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	name: z.string().min(3)
});

export const load = (async () => {
	try {
		const gamesResponse = await getGames();
		return { games: gamesResponse };
	} catch (err) {
		console.log(err);
		return { error: (err as Error).message };
	}

	// Always return { form } in load functions
}) satisfies PageServerLoad;

// export const actions: Actions = {
// 	default: async ({ request }) => {
// 		const formData = await request.formData();
//
// 		try {
// 			const game = createResponse.data;
// 			return {
// 				game
// 			};
// 		} catch (err) {}
// 	}
// } satisfies Actions;
