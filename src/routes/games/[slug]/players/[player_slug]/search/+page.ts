import { ApiError } from '$lib/api/api';
import { ApiClient } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AbilityDetails, Role, Status } from '$lib/api/types';

export const load: PageLoad = async () => {
	const client = new ApiClient();
	let allAbilities: AbilityDetails[] = [];
	let statuses: Status[] = [];
	try {
		//get all abilities and any abilities, merge them into one array, skipping duplicates (aka name is in the list already)
		await Promise.all([
			client.abilityDetailsApi.getAllAbilitiesDetails(),
			client.statusApi.GetAllStatuses()
		] as const).then(([abilities, statusesResponse]) => {
			allAbilities = abilities;
			statuses = statusesResponse;
		});
	} catch (err) {
		if (err instanceof ApiError) {
			return error(500, err.message);
		}
		return error(500, 'Something went wrong');
	}

	return { allAbilities, statuses };
};
