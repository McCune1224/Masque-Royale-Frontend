import type { LayoutServerLoad } from './$types';
import type { Game } from '$lib/api/types';
import { ApiClient } from '$lib/api/client';

export const load: LayoutServerLoad = async ({ params }) => {
	const { slug } = params;
	const client = new ApiClient();
  try {
    const game = await client.gameApi.getGame(+slug);
    return { game };
  } catch (error) {
    return { game: null };
  }
};
