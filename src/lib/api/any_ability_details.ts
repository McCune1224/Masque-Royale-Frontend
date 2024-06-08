import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { AnyAbilityDetails } from './types';

export class anyAbilityDetailsApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}

	public async getAllAnyAbilities(): Promise<AnyAbilityDetails[]> {
		return this.get<AnyAbilityDetails[]>('/api/any_abilities');
	}

	public async getAnyAbility(id: number): Promise<AnyAbilityDetails> {
		return this.get<AnyAbilityDetails>(`/api/any_abilities/${id}`);
	}

	public async getAnyAbilityByName(name: string): Promise<AnyAbilityDetails> {
		return this.get<AnyAbilityDetails>(`/api/any_abilities/search?name=${name}`);
	}
}
