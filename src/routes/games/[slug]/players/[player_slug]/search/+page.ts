import { ApiError } from '$lib/api/api';
import { ApiClient } from '$lib/api/client';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { AbilityDetails, AnyAbilityDetails, Status } from '$lib/api/types';

export const load: PageLoad = async () => {
	const client = new ApiClient();
	let allAbilities: (AbilityDetails | AnyAbilityDetails)[] = [];
	let statuses: Status[] = [];
	try {
		//get all abilities and any abilities, merge them into one array, skipping duplicates (aka name is in the list already)
		await Promise.all([
			client.abilityDetailsApi.getAllAbilitiesDetails(),
			client.anyAbilityDetailsApi.getAllAnyAbilities(),
			client.statusApi.GetAllStatuses()
		] as const).then(([abilities, anyAbilities, statusesResponse]) => {
			statuses = statusesResponse;
			allAbilities = [...abilities, ...anyAbilities].filter(
				(ability, index, self) => self.findIndex((a) => a.name === ability.name) === index
			);
			console.log('allAbilities Page load side', allAbilities.length);
		});
	} catch (err) {
		if (err instanceof ApiError) {
			return error(500, err.message);
		}
		return error(500, 'Something went wrong');
	}
	return { allAbilities, statuses };
};
