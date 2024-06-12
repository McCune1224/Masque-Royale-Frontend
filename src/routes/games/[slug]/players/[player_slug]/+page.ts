import { ApiError } from '$lib/api/api';
import { ApiClient } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const client = new ApiClient();
	try {
		// make wait group to wait for all the async calls
		const currentPlayer = await client.playerApi.getPlayer(params.slug, params.player_slug);
		const currentRole = await client.roleApi.getCompleteRole(currentPlayer.role_id.toString());
		return { currentPlayer, currentRole };
	} catch (err) {
		if (err instanceof ApiError) {
			return { error: err.message };
		} else {
			return error(500, { message: 'Something went wrong' });
		}
	}
};
