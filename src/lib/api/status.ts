import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { ApiClientBase } from './api';
import type { Status } from './types';

export class statusApi extends ApiClientBase {
	constructor() {
		super(PUBLIC_BACKEND_URL);
	}
	public async GetAllStatuses(): Promise<Status[]> {
		return this.get<Status[]>(`/api/statuses`);
	}
}
