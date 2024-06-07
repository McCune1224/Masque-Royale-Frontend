import { ApiClient } from '$lib/api/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	console.log(slug);

	const client = new ApiClient();

	try {
		const foo = await client.gameApi.GetActionsForGame(slug);
		console.log(foo);
		return { error: null };
	} catch (error) {
		console.log(error);
		return { error };
	}

	return {};
};
