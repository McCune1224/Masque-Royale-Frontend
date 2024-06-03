import { ApiError } from '$lib/api/api';
import { ApiClient } from '$lib/api/client';
import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const client = new ApiClient();
	try {
		const game = await client.gameApi.getGame(+params.slug);
		const players = await client.playerApi.getAllPlayersForGame(params.slug);
		return { game, players };
	} catch (err) {
		if (err instanceof ApiError) {
			return error(500, err.message);
		}
	}
};
