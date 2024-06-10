import type { LayoutLoad } from './$types';
import type { Game } from '$lib/api/types';
import { ApiClient } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import { ApiError } from '$lib/api/api';

export const load: LayoutLoad = async ({ params }) => {
	const { slug } = params;
	const client = new ApiClient();
	try {
		const game = await client.gameApi.getGame(+slug);
		return { game };
	} catch (err) {
		if (err instanceof ApiError) {
			return error(500, err.message);
		} else {
			return error(500, 'Something went wrong');
		}
	}
};
