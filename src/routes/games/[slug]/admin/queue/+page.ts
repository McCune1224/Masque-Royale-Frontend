import { ApiClient } from '$lib/api/client';
import type { Game, Player } from '$lib/api/types';
import { fail } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	const client = new ApiClient();

	try {
		try {
			const actions = await client.gameApi.getActionsForGame(slug);
			const players = await client.playerApi.getAllPlayersForGame(slug);
			const game = await client.gameApi.getGame(+slug);
			return { game, players, actions };
		} catch (error) {
			return fail(500, { error });
		}
	} catch (error) {
		return { error };
	}
};
