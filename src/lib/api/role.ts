import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Role } from './types';

export class roleApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async getAllRoles(): Promise<Role[]> {
		return this.get<Role[]>('/api/roles');
	}
}
