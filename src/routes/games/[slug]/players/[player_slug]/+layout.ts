import { ApiClient } from '$lib/api/client';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const { slug, player_slug } = params;
	const client = new ApiClient();
	Promise.all([client.playerApi.getPlayer(slug, player_slug)])
		.then(([player]) => {
			return { player };
		})
		.catch((err) => {
			console.log(err);
			return {
				error: err.message
			};
		});
};
