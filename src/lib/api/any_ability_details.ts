import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Game } from './types';

export class anyAbilityDetailsApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllAnyAbilities(): Promise<AnyAbilityDetails[]> {
		return this.get<AnyAbilityDetails[]>('/api/any_abilities');
	}
}
