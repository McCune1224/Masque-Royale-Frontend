import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { AbilityDetails } from './types';

export class abilityDetailsApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}

	public async getAllAbilitiesDetails(): Promise<AbilityDetails[]> {
		return this.get<AbilityDetails[]>('/api/abilities');
	}

	public async getAbilityDetail(id: number): Promise<AbilityDetails> {
		return this.get<AbilityDetails>(`/api/abilities/${id}`);
	}

	public async getAbilityDetailByName(name: string): Promise<AbilityDetails> {
		return this.get<AbilityDetails>(`/api/abilities/search?name=${name}`);
	}
}
