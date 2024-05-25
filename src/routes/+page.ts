import { ApiClient } from '$lib/api/client';
import type { Game } from '$lib/api/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({}) => {
	const client = new ApiClient();
	let games: Game[];

	try {
		games = await client.userApi.getAllGames();
		return {
			games
		};
	} catch (err) {
		return {
			err
		};
	}
};
