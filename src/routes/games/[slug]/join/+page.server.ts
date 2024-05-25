import { gamesGetByID, type Game } from '$lib/api/game';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		let response = await gamesGetByID(+params.slug);
		const game = response;
		if (game == undefined) {
			return {
				gameId: params.slug,
				error: `Game ID ${params.slug} is not valid`
			};
		}
		return {
			game,
			gameId: params.slug
		};
	} catch (err) {
		return {
			gameId: params.slug,
			error: (err as Error).message
		};
	}
};
